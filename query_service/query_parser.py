from flask import Flask, make_response, request, current_app
import nltk
import json
import csv
import cgi
import requests
import re
import string
import urllib2
from datetime import timedelta
from functools import update_wrapper
import sys

reload(sys)
sys.setdefaultencoding("utf-8")

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

ip = urllib2.urlopen('http://whatismyip.akamai.com').read()
city = []
state = {}
#conflicts right now between Louisiana(LA) and Los Angeles(LA) and Indiana(IN) and the word 'in'
commands = {"compare":"compare","vs.":"compare","vs":"compare","get":"get","find":"get","difference between":"compare"}
common_abbrs = {"nyc":"new york, new york","slc":"salt lake city, utah","la":"los angeles, california"}

states = open("states.csv", "rU")

cities = [line.strip() for line in open("city_state.txt")]
#cities = cities[0].split("\r")

unis = {}
for line in open("universities.csv"):
	arr = line.strip().split(",")
	unis[arr[0]] = arr

for line in csv.reader(states):
	state[line[0].lower()] = line[1].lower()

app = Flask(__name__)

@app.route('/query/<string:query>', methods=['GET'])
@crossdomain(origin='*')
def query(query):
	object = []
	ops = []
	locations = []
	schools = []
	command = ""
	package = {}
	sent_query = query
	query = query.lower()
	
	#query = str(query).translate(string.maketrans("",""), string.punctuation)
	if(query[len(query)-1:] == "." or query[len(query)-1:] == "?" or query[len(query)-1:] == "!" or query[len(query)-1:] == ";"):
		query = query[:len(query)-1]

	query = " " + query + " "

	for u,l in unis.iteritems():
		for a in l:
			if " " + a.lower() + " " in query:
				schools.append(u)
	for abbr, st in state.iteritems():
		if re.search(r"\b" + abbr + r"\b", query):
			query = re.sub(r"\b" + abbr + r"\b", st, query)
	for abbr, c in common_abbrs.iteritems():
		if re.search(r"\b" + abbr + r"\b", query):
			query = re.sub(r"\b" + abbr + r"\b", c, query)
	for c in cities:
		temp = " " + c.replace(",", "").lower() + " "
		if(temp in query):
			locations.append(c)
		if(" " + c.lower() + " " in query):
			locations.append(c)
		cname = " " + c[:c.index(",")].lower() + " "
		if(cname in query):
			if(c not in locations):
				locations.append(c)
	#tokens = nltk.word_tokenize(query)
	for s in commands:
		if s in query:
			command = commands[s]

	if("afford" in query or "spending" in query):
		package = {
			"operation":"get",
			"query":sent_query,
			"query_type":"spending"
		}

		resp = json.dumps(package)
		return resp
	#tags = nltk.pos_tag(tokens)
	#for w,t in tags:
	#	if t == "JJ":
	#		object.append(w)
	#	if t == "NN":
	#		object.append(w)
	#	if t == "NNP":
	#		ops.append(w)
	#	if t == "VBP":
	#		ops.append(w)
	#	if t == "VBN":
	#		ops.append(w)
	if command == "" and len(schools) == 1:
		command = "get"
	if command == "" and len(schools) > 1:
		command = "compare"
	if command == "" and len(locations) == 1:
		command = "get"
	if command == "" and len(locations) > 1:
		command = "compare"
	if len(schools) == 0 and len(locations) == 0:
		package = {
			"operation":"undefined",
			"query":sent_query
		}
		resp = json.dumps(package)
		return resp

	if len(schools) >= 1:
		package = {
			"operation":command,
			"query":sent_query,
			"schools":[]
		}
		for s in schools:
			package["schools"].append({"name":s})
		url = "https://%s/api/v1/schools/" % (ip)
		#url = "https://trycents.com/api/v1/schools/"
		payload = json.dumps(package)
		r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
		prep = r.prepare()
		s = requests.Session()
		s.verify = False
		resp = s.send(prep)
		if(resp.status_code == 400):
			package = {
				"operation":"undefined",
				"query":sent_query
			}
			resp = json.dumps(package)
			return resp
		package = json.loads(resp.text)
		if(package["operation"] == "undefined"):
			package = {
				"operation":"undefined",
				"query":sent_query
			}
			resp = json.dumps(package)
			return resp
		for i in range(0, len(schools)):
			package["school_"+`i+1`+"_name"] = schools[i]
		package["query"] = sent_query
		package["query_type"] = "school"
		resp = json.dumps(package)
		return resp
	elif len(locations) >= 1:
		package = {
			"operation":command,
			"query":query,
			"locations":[]
		}
		for l in locations:
			package["locations"].append({"city":l[:l.index(",")],"state":l[l.index(", ")+2:]})
		url = "https://%s/api/v1/coli/" % (ip)
		#url = "https://trycents.com/api/v1/coli"
		payload = json.dumps(package)
		r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
		prep = r.prepare()
		s = requests.Session()
		s.verify = False
		resp = s.send(prep)
		if(resp.status_code == 400):
			package = {
				"operation":"undefined",
				"query":sent_query
			}
			resp = json.dumps(package)
			return resp
		package = json.loads(resp.text)
		if(package["operation"] == "undefined"):
			package = {
				"operation":"undefined",
				"query":sent_query
			}
			resp = json.dumps(package)
			return resp
		package["query"] = sent_query
		package["query_type"] = "city"
		resp = json.dumps(package)
		return resp

@app.route('/data/<string:data>', methods=['GET'])
@crossdomain(origin='*')
def data(data):
	query = cgi.parse_qs(data)

	if(query['type'][0] == 'coli'):
		package  = {
			"query":query,
			"locations":[]
		}
		for o in query['option']:
			package["locations"].append({"city":o[:o.index(",")],"state":o[o.index(", ")+2:]})

		if(len(query['option']) == 1):
			package['operation'] = "get"
		else:
			package['operation'] = "compare"

		url = "https://trycents.com/api/v1/coli/"

		print package
		payload = json.dumps(package)
		r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
		prep = r.prepare()
		s = requests.Session()
		s.verify = False
		resp = s.send(prep)
		return resp.text

	if(query['type'][0] == 'school'):
		package  = {
			"query":query,
			"schools":[]
		}
		for s in query['option']:
			package["schools"].append({"name":s})

		if(len(query['option']) == 1):
			package['operation'] = "get"
		else:
			package['operation'] = "compare"

		url = "https://trycents.com/api/v1/schools/"

		print package
		payload = json.dumps(package)
		r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
		prep = r.prepare()
		s = requests.Session()
		s.verify = False
		resp = s.send(prep)
		package = json.loads(resp.text)
		for i in range(0, len(query['option'])):
			package["school_"+`i+1`+"_name"] = query['option'][i]
		return json.dumps(package)
	

if __name__ == '__main__':
	app.run(host='0.0.0.0',port=6001,debug=True,processes=5)#,ssl_context=('/etc/ssl/certs/ssl-bundle.crt','../.ssl/myserver.key'))