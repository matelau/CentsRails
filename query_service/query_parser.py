from flask import Flask, make_response, request, current_app
import nltk
import json
import csv
import urlparse
import requests
import re
import string
import urllib2
import urllib
from datetime import timedelta
from functools import update_wrapper
import sys

try:
    from flask.ext.cors import CORS  # The typical way to import flask-cors
except ImportError:
    # Path hack allows examples to be run without installation.
    import os
    parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.sys.path.insert(0, parentdir)

    from flask.ext.cors import CORS

reload(sys)
sys.setdefaultencoding("utf-8")

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
common_abbrs = {"sf":"san francisco, california","nyc":"new york, new york","slc":"salt lake city, utah","la":"los angeles, california","ft.":"fort","ft":"fort","mt.":"mount","mt":"mount"}
supers = {"best":"","worst":"","cheapest":"","expensive":"","priciest":""}
levels = ["associate","bachelor","master","doctorate"]
datasets = {"schools":"school","universities":"university","cities":"city","majors":"degree","degrees":"degrees"}

states = open("states.csv", "rU")

cities = [line.strip() for line in open("city_state.txt")]

unis = {}
for line in open("universities.csv"):
	arr = line.strip().split(",")
	unis[arr[0]] = arr

for line in csv.reader(states):
	state[line[0].lower()] = line[1].lower()

murl = "https://trycents.com/api/v2/degrees?only_level_names=false"
r = requests.Request("GET",murl,headers={'Accept':'application/json'})
mprep = r.prepare()
ms = requests.Session()
ms.verify = False
mresp = ms.send(mprep)

majs = json.loads(mresp.text)

cpac = {
	"operation":"get",
	"tables":[
		"cost of living"
	]
}

cpayload = json.dumps(cpac)
murl = "https://trycents.com/api/v1/record_names/"
r = requests.Request("POST",murl,headers={'Content-Type':'application/json','Accept':'application/json'},data=cpayload)
cprep = r.prepare()
cs = requests.Session()
cs.verify = False
cresp = cs.send(cprep)

cities = json.loads(cresp.text)

murl = "https://trycents.com/api/v2/careers"
r = requests.Request("GET",murl,headers={'Accept':'application/json'})
cprep = r.prepare()
cs = requests.Session()
cs.verify = False
cresp = cs.send(cprep)

careers = json.loads(cresp.text)

# for c in cities:
# 	cabbr = ""
# 	for a, s in state.iteritems():
# 		if s in c:
# 			li = c.rsplit(s, 1)
# 			cabbr = a.join(li)

# 	cname = c[:c.index(",")]
# 	city = c.replace(",","")
# 	cabbr = cabbr.replace(",","")
# 	carr = city.split(" ")
# 	cabbrarr = cabbr.split(" ")
# 	cnamearr = cname.split(" ")
#cities = cities[0].split("\r")

app = Flask(__name__)
cors = CORS(app)

@app.route('/query/<string:query>', methods=['GET'])
def query(query):

	with open("../data/queries.txt", "a") as logfile:
		logfile.write(query + "\n")

	ops = []
	locations = []
	schools = []
	majors = []
	careers = []
	maj_names = []
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
				if u not in schools:
					schools.append(u)
	for abbr, st in state.iteritems():
		if re.search(r"\b" + abbr + r"\b", query):
			query = re.sub(r"\b" + abbr + r"\b", st, query)
	for abbr, c in common_abbrs.iteritems():
		if re.search(r"\b" + abbr + r"\b", query):
			query = re.sub(r"\b" + abbr + r"\b", c, query)
	lmatch = []
	for l in levels:
		if l in query:
			lmatch.append(l)
	for m in majs:
		mname = m.split("(")[0].strip()
		mlev = m.split("(")[1].replace(")","").strip()
		stay = True
		if len(lmatch) > 0:
			for l in lmatch:
				if l in mlev.lower():
					stay = False
			if stay:
				continue
		if " " + mname.lower() + " " in query:
			majors.append({"name":mname,"level":mlev})
			maj_names.append(m)
	print majors
	for c in cities:
		temp = " " + c.replace(",", "").lower() + " "
		if(temp in query):
			if c not in locations:
				locations.append(c)
		if(" " + c.lower() + " " in query):
			if c not in locations:
				locations.append(c)
		cname = " " + c[:c.index(",")].lower() + " "
		if cname in query:
			if c not in locations:
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
	if command == "" and len(majors) == 1:
		command = "get"
	if command == "" and len(majors) > 1:
		command = "compare"

	if len(schools) == 0 and len(locations) == 0 and len(majors) == 0:
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
		#url = "https://%s/api/v1/schools/" % (ip)
		url = "https://trycents.com/api/v2/schools/compare"
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
	elif len(majors) >= 1:
		package = {
			"operation":command,
			"query":query,
			"majors":[]
		}
		for m in majors:
			package["majors"].append(m)
		#url = "https://%s/api/v1/schools/" % (ip)
		url = "https://trycents.com/api/v2/degrees/compare"
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
		for i in range(0, len(majors)):
			package["major_"+`i+1`+"_name"] = maj_names[i]
		package["query"] = sent_query
		package["query_type"] = "major"
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
		#url = "https://%s/api/v1/coli/" % (ip)
		url = "https://trycents.com/api/v2/cost_of_living/compare"
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

@app.route('/data', methods=['POST'])
def data():
	#query = cgi.parse_qs(data)

	query = json.loads(request.data)

	if(query['type'] == 'city'):
		package  = {
			"locations":[]
		}
		for o in query['option']:
			if "," in o:
				package["locations"].append({"city":o[:o.index(",")],"state":o[o.index(", ")+2:]})
			else:
				package["locations"].append({"state":o})

		if(len(query['option']) == 1):
			package['operation'] = "get"
		else:
			package['operation'] = "compare"

		url = "https://trycents.com/api/v1/coli/"

		payload = json.dumps(package)
		r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
		prep = r.prepare()
		s = requests.Session()
		s.verify = False
		resp = s.send(prep)
		return resp.text

	if(query['type'] == 'school'):
		package  = {
			"schools":[]
		}

		sarr = []
		scarr = []

		for s in query['option']:
			sarr.append(s.lower())

		for u,l in unis.iteritems():
			for a in l:
				if a.lower() in sarr:
					package["schools"].append({"name":u})
					scarr.append(u)


		if(len(query['option']) == 1):
			package['operation'] = "get"
		else:
			package['operation'] = "compare"

		url = "https://trycents.com/api/v1/schools/"

		payload = json.dumps(package)
		r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
		prep = r.prepare()
		s = requests.Session()
		s.verify = False
		resp = s.send(prep)
		package = json.loads(resp.text)
		for i in range(0, len(scarr)):
			package["school_"+`i+1`+"_name"] = scarr[i]
		return json.dumps(package)

	if(query['type'] == 'major'):
		package = {
			"majors":[]
		}

		if(len(query['option']) == 1):
			package['operation'] = "get"
		else:
			package['operation'] = "compare"

		for o in query['option']:
			mname = o.split("(")[0].strip()
			mlev = o.split("(")[1].replace(")","").strip()
			package["majors"].append({"name":mname,"level":mlev})

		url = "https://trycents.com/api/v1/majors/"

		payload = json.dumps(package)
		r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
		prep = r.prepare()
		s = requests.Session()
		s.verify = False
		resp = s.send(prep)

		package = json.loads(resp.text)
		for i in range(0, len(query['option'])):
			package["major_"+`i+1`+"_name"] = query['option'][i]
		return json.dumps(package)

	if(query['type'] == 'career'):
		package = {
			"careers":[]
		}

		if(len(query['option']) == 1):
			package['operation'] = "get"
		else:
			package['operation'] = "compare"

		for o in query['option']:
			package["careers"].append(o)

		url = "https://trycents.com/api/v2/careers/compare"

		payload = json.dumps(package)
		r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
		prep = r.prepare()
		s = requests.Session()
		s.verify = False
		resp = s.send(prep)
		package = json.loads(resp.text)
		for i in range(0, len(query['option'])):
			package["career_"+`i+1`+"_name"] = query['option'][i]
		return json.dumps(package)
	
#app.config['SERVER_NAME'] = "trycents.com"

if __name__ == '__main__':
	app.run(host='0.0.0.0',port=6001,debug=True,processes=10,ssl_context=('/etc/ssl/certs/ssl-bundle.crt','../.ssl/myserver.key'))