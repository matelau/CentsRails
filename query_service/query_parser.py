from flask import Flask, make_response, request, current_app
from datetime import timedelta
from functools import update_wrapper
import json
import csv
import urlparse
import requests
import re
import string
import urllib2
import urllib
import sys
import operator
import helpers as hp
import list_builders as lb

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

city = []
state = {}
#conflicts right now between Louisiana(LA) and Los Angeles(LA) and Indiana(IN) and the word 'in'
commands = {"compare":"compare","vs.":"compare","vs":"compare","get":"get","find":"get","difference between":"compare"}
common_abbrs = {"sf":"san francisco, california","nyc":"new york, new york","slc":"salt lake city, utah","la":"los angeles, california","ft.":"fort","ft":"fort","mt.":"mount","mt":"mount"}
supers = {"best":"","worst":"","cheapest":"","expensive":"","priciest":"","random":""}
levels = ["associate","bachelor","master","doctorate","certificate"]
datasets = {"occupation":"career","career":"career","job":"career","school":"school","universities":"school","city":"city","town":"city","cities":"city","major":"degree","degree":"degree"}

states = open("states.csv", "rU")

unis = {}
for line in open("universities.csv"):
	arr = line.strip().split(",")
	unis[arr[0]] = arr

for line in csv.reader(states):
	state[line[0].lower()] = line[1].lower()

punc = [".","?",",","!",";",":"]

majs = lb.make_major_list()
cities = lb.make_city_list()
cars = lb.make_career_list()

app = Flask(__name__)
cors = CORS(app)

@app.route('/query/<string:sent_query>', methods=['GET'])
def query(sent_query):
	with open("../data/queries.txt", "a") as logfile:
		logfile.write(sent_query + "\n")

	ops = []
	locations = []
	schools = []
	majors = []
	careers = []
	maj_names = []
	command = ""
	package = {}
	query = sent_query.lower()
	
	#query = str(query).translate(string.maketrans("",""), string.punctuation)
	if query[len(query)-1:] in punc:
		query = query[:len(query)-1]

	qgram = hp.build_engram(query)

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
	cgrams = {}
	mgrams = {}
	for c in cars:
		cgram = hp.build_engram(c.lower())
		cgram.sort(key=lambda t: len(t), reverse=True)
		for gram in cgram:
			if gram in qgram:
				if c in cgrams:
					if len(gram) > cgrams[c]:
						cgrams[c] = len(gram)
						mgrams[c] = gram
				else:
					cgrams[c] = len(gram)
					mgrams[c] = gram

	if len(cgrams) > 0:
		ordered_keys = sorted(cgrams.items(), key=operator.itemgetter(1), reverse=True)

		mval = cgrams[ordered_keys[0][0]]
		m = mval
		grams = set()
		for x in range(0,len(ordered_keys)):
			m = cgrams[ordered_keys[x][0]]
			if m < mval:
				next = False
				for g in gram:
					if set(mgrams[ordered_keys[x][0]]) < set(g):
						next = True

				if next:
					continue
			careers.append(ordered_keys[x][0])
			grams.add(mgrams[ordered_keys[x][0]])

	if "spending" in query or "afford" in query:
		if len(careers) > 0:
			package = {
				"operation":command,
				"query":query,
				"careers":[]
			}
			package["careers"].append({"name": careers[0]})

			url = "https://trycents.com/api/v2/careers/compare"
			payload = json.dumps(package)
			r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
			prep = r.prepare()
			s = requests.Session()
			s.verify = False
			resp = s.send(prep)

			tempp = json.loads(resp.text)

			package = {
				"operation":"get",
				"query":sent_query,
				"query_type":"spending"
			}
			package["income"] = tempp["elements"][0]["career_salary"][10]

			resp = json.dumps(package)
			return resp
		elif "salary" in query or "income" in query:
			package = {
				"operation":"get",
				"query":sent_query,
				"query_type":"spending"
			}

			tempq = query.replace(",","")
			salary = [int(s) for s in tempq.split() if s.isdigit()]
			if len(salary) > 0:
				package["income"] = salary[0]

			resp = json.dumps(package)
			return resp
		else:
			package = {
				"operation":"get",
				"query":sent_query,
				"query_type":"spending"
			}

			resp = json.dumps(package)
			return resp

	for s in commands:
		if s in query:
			command = commands[s]

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
	if command == "" and len(careers) == 1:
		command = "compare"
	if command == "" and len(careers) > 1:
		command = "compare"

	if len(schools) == 0 and len(locations) == 0 and len(majors) == 0 and len(careers) == 0:
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

		package["query"] = sent_query
		package["query_type"] = "school"
		resp = json.dumps(package)
		return resp
	elif len(majors) >= 1:
		package = {
			"operation":command,
			"query":query,
			"degrees":[]
		}
		for m in majors:
			package["degrees"].append(m)

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
	elif len(careers) >= 1:
		package = {
			"operation":command,
			"query":query,
			"careers":[]
		}
		for c in careers:
			package["careers"].append({"name": c})

		url = "https://trycents.com/api/v2/careers/compare"
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
		package["query_type"] = "career"
		resp = json.dumps(package)
		return resp

@app.route('/data', methods=['POST'])
def data():
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

		url = "https://trycents.com/api/v2/cost_of_living/compare"

		return hp.send_request(url,package)

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
					package["schools"].append({"name":u, "order":(sarr.index(a.lower())+1)})
					scarr.append(u)

		if len(package["schools"]) == 1:
			del package["schools"][0]["order"]

		if(len(query['option']) == 1):
			package['operation'] = "get"
		else:
			package['operation'] = "compare"

		url = "https://trycents.com/api/v2/schools/compare"

		return hp.send_request(url,package)

	if(query['type'] == 'major'):
		package = {
			"degrees":[]
		}

		if(len(query['option']) == 1):
			package['operation'] = "get"
		else:
			package['operation'] = "compare"

		for o in query['option']:
			mname = o.split("(")[0].strip()
			mlev = o.split("(")[1].replace(")","").strip()
			package["degrees"].append({"name":mname,"level":mlev})

		url = "https://trycents.com/api/v2/degrees/compare"

		return hp.send_request(url,package)

	if(query['type'] == 'career'):
		package = {
			"careers":[]
		}

		if(len(query['option']) == 1):
			package['operation'] = "get"
		else:
			package['operation'] = "compare"

		for o in query['option']:
			package["careers"].append({"name":o})

		url = "https://trycents.com/api/v2/careers/compare"

		return hp.send_request(url,package)
	
#app.config['SERVER_NAME'] = "trycents.com"

if __name__ == '__main__':
	app.run(host='0.0.0.0',port=6001,debug=True,processes=10,ssl_context=('/etc/ssl/certs/ssl-bundle.crt','../.ssl/myserver.key'))