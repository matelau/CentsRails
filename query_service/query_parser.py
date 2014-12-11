from flask import Flask, make_response, request, current_app
import nltk
import json
import csv
import requests
import re
from datetime import timedelta
from functools import update_wrapper

def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator

def pp(req):
    """
    At this point it is completely built and ready
    to be fired; it is "prepared".

    However pay attention at the formatting used in 
    this function because it is programmed to be pretty 
    printed and may differ from the actual request.
    """
    print('{}\n{}\n{}\n\n{}'.format(
        '-----------START-----------',
        req.method + ' ' + req.url,
        '\n'.join('{}: {}'.format(k, v) for k, v in req.headers.items()),
        req.body,
    ))

city = []
state = {}
commands = {"compare":"compare","vs.":"compare","vs":"compare","get":"get","find":"get","difference between":"compare"}
common_abbrs = {"nyc":"new york, new york","slc":"salt lake city, utah"}

states = open("states.csv", "rU")

cities = [line.strip() for line in open("cities.txt")]
cities = cities[0].split("\r")

for line in csv.reader(states):
	state[line[0].lower()] = line[1].lower()

app = Flask(__name__)

@app.route('/query/<string:query>', methods=['GET'])
@crossdomain(origin='*')
def query(query):
	object = []
	ops = []
	locations = []
	command = ""
	query = query.lower()
	if(query[len(query)-1:] == "." or query[len(query)-1:] == "?" or query[len(query)-1:] == "!" or query[len(query)-1:] == ";"):
		query = query[:len(query)-1]
	for abbr, st in state.iteritems():
		if re.search(r"\b" + abbr + r"\b", query):
			query = re.sub(r"\b" + abbr + r"\b", st,query)
	for abbr, c in common_abbrs.iteritems():
		if re.search(r"\b" + abbr + r"\b", query):
			query = re.sub(r"\b" + abbr + r"\b", c,query)
	for c in cities:
		temp = c.replace(",", "").lower()
		if(temp in query):
			locations.append(c)
		if(c.lower() in query):
			locations.append(c)
		cname = c[:c.index(",")].lower()
		if(cname in query):
			if(c not in locations):
				locations.append(c)
	tokens = nltk.word_tokenize(query)
	for s in commands:
		if s in query:
			command = commands[s]
	tags = nltk.pos_tag(tokens)
	for w,t in tags:
		if t == "JJ":
			object.append(w)
		if t == "NN":
			object.append(w)
		if t == "NNP":
			ops.append(w)
		if t == "VBP":
			ops.append(w)
		if t == "VBN":
			ops.append(w)
	if command == "" and len(locations) == 1:
		command = "get"
	if command == "" and len(locations) > 1:
		command = "compare"
	if command == "" and len(locations) == 0:
		package = {
			"operation":"not found",
			"query":query
		}
	else:
		package = {
			"search_by":"location",
			"objects":[],
			"query":query
		}
		for l in locations:
			package["objects"].append({"city":l[:l.index(",")]})
		url = "http://localhost:3000/api/v1/coli/"
		payload = json.dumps(package)
		r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
		prep = r.prepare()
		s = requests.Session()
		resp = s.send(prep)
		package = json.loads(resp.text)
		package["operation"] = command
	resp = json.dumps(package)
	return resp

if __name__ == '__main__':
	app.run(port=6001,debug=True)
