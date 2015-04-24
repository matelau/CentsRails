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
import os
import struct
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

###
# KNOWN ISSUES
###

#conflict between careers containing 'lead' and a city named lead
#conflict with universities containing 'state' and career 'state trooper'
#conflicts with cities containing university aliases
#conflicts with cities containing de and la
#conflicts right now between Louisiana(LA) and Los Angeles(LA) and Indiana(IN) and the word 'in' - resolved some
#conflict between mt and montana - resolved

#building replacement lists
commands = {"compare":"compare","vs.":"compare","vs":"compare","get":"get","find":"get","difference between":"compare"}
state_catch = {", de":", delaware",", in":", indiana",", mt":", montana",", la":", louisiana"}
common_abbrs = {"sf":"san francisco, california","nyc":"new york, new york","slc":"salt lake city, utah","la":"los angeles, california","ft":"fort","mt":"mount","st":"saint"}
supers = {"best":"best","worst":"worst","cheapest":"cheapest","least expensive":"cheapest","most expensive":"priciest","priciest":"priciest","random":"random","any":"random"}
levels = ["associate","bachelor","master","doctorate","certificate"]
datasets = {"occupation":"careers","occupations":"careers","career":"careers","careers":"careers","job":"careers","jobs":"careers","school":"schools","schools":"schools","universities":"schools","university":"schools","city":"cost_of_living","town":"cost_of_living","towns":"cost_of_living","cities":"cost_of_living","major":"degrees","majors":"degrees","degree":"degrees","degrees":"degrees"}
dvals = ["cost_of_living","schools","careers","degrees"]
nvals = {"cost_of_living":"city","schools":"school","careers":"career","degrees":"major"}

states = open("states.csv", "rU")

#set up universities alias checker list
unis = {}
for line in open("universities.csv"):
	arr = line.strip().split(",")
	unis[arr[0]] = arr

#set up states hash for replacing state codes
state = {}
for line in csv.reader(states):
	state[line[0].lower()] = line[1].lower()

punc = [".","?",",","!",";",":"]

# set up lists
majs = lb.make_major_list()
cities = lb.make_city_list()
cars = lb.make_career_list()

app = Flask(__name__)
cors = CORS(app)

###########################################################
#
#	Flask route for interpreting strings
#
#	Author = Austin Hammer
#
###########################################################
@app.route('/query/<string:sent_query>', methods=['GET'])
def query(sent_query):
	with open("../data/queries.txt", "a") as logfile:
		logfile.write(sent_query + "\n")

	#declaring arrays for building
	ops = []
	locations = []
	schools = []
	majors = []
	careers = []
	maj_names = []
	command = ""
	package = {}

	#making case insensitive
	query = sent_query.lower()

	#if all they sent in was loan, redirect to loan calculator
	if query == "loan":
		package = {
			"operation":"get",
			"query":sent_query,
			"query_type":"loan"
		}
		resp = json.dumps(package)
		return resp
	
	#formatting query to cut down on errors
	if query[len(query)-1:] in punc:
		query = query[:len(query)-1]

	#build a subset of ngrams from query
	qgram = hp.build_ngram(query)

	#ditch periods
	query = query.replace(".", "")
	query = " " + query + " "

	sval = ""
	dval = ""

	#checking for super key words, normalizing
	for s,v in supers.iteritems():
		if " " + s + " " in query:
			sval = v
			break

	#checking for dataset key words, normalizing
	for d,v in datasets.iteritems():
		if " " + d + " " in query:
			dval = v
			break

	#check for matches without superlatives
	sfault = False
	if sval == "cheapest" or sval == "priciest":
		if dval == "careers" or dval == "degrees" or dval == "":
			sfault = True

	if dval == "" and sval == "":
		sfault = True

	if (dval == "schools" or dval == "cost_of_living" or dval == "degrees" or dval == "careers") and sval == "":
		sfault = True

	if sval == "random" and dval == "":
		value = struct.unpack("<L", os.urandom(4))[0] % 4
		dval = dvals[value]

	#if we have a solid direction, request the superlative
	if not sfault:
		url = "https://trycents.com/api/v2/" + dval + "/" + sval
		qtype = nvals[dval]

		return hp.send_get(url, qtype)

	#disambiguation between college abbrs and city, state combos
	match_on_st = 0

	#query normalization steps
	for u,l in unis.iteritems():
		for a in l:
			if " " + a.lower() + " " in query:
				if u not in schools:
					if a.lower() in state.values():
						match_on_st += 1
					schools.append(u)
	for abbr, st in state_catch.iteritems():
		if re.search(r"\b" + abbr + r"\b", query):
			query = re.sub(r"\b" + abbr + r"\b", st, query)
	for abbr, c in common_abbrs.iteritems():
		if re.search(r"\b" + abbr + r"\b", query):
			query = re.sub(r"\b" + abbr + r"\b", c, query)
	for abbr, st in state.iteritems():
		if re.search(r"\b" + abbr + r"\b", query):
			query = re.sub(r"\b" + abbr + r"\b", st, query)

	#major parsing steps
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
			maj_names.append(mname)

	#city parsing steps
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
			cmatch = False
			for st in state.values():
				if cname in " " + st + " ":
					if st in query:
						cmatch = True
						if query.count(cname) > query.count(" " + st + " "):
							if c not in locations:
								locations.append(c)
						if cname == " new york ":
							if c not in locations:
								locations.append(c)
			if not cmatch:
				if c not in locations:
					locations.append(c)
			
	cgrams = {}
	mgrams = {}

	#career parsing steps
	for c in cars:
		cgram = hp.build_ngram(c.lower())
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
				for g in grams:
					if set(mgrams[ordered_keys[x][0]]) < set(g):
						next = True
				if next:
					continue
			careers.append(ordered_keys[x][0])
			grams.add(mgrams[ordered_keys[x][0]])

		if len(majors) > 0 and len(careers) > 0:
			maj_names.sort(key=lambda t: len(t), reverse=True)
			maj_gram = hp.build_ngram(maj_names[0])
			maj_gram.sort(key=lambda t: len(t), reverse=True)
			if len(mgrams[ordered_keys[0][0]]) > len(maj_gram[0]):
				majors = []

	#spending breakdown parsing
	if "spending" in query or "afford" in query:
		if len(careers) > 0:
			package = {
				"operation":command,
				"query":query,
				"careers":[]
			}
			package["careers"].append({"name": careers[0]})

			url = "https://trycents.com/api/v2/careers/compare"
			resp = hp.post_with_response(url,package)

			csal = json.loads(resp.text)

			package = {
				"operation":"get",
				"query":sent_query,
				"query_type":"spending"
			}
			package["income"] = csal["elements"][0]["career_salary"][10]

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

	#if locations trumps schools, go with locations
	if len(locations) > 0 and len(schools) > 0:
		if match_on_st == len(schools):
			schools = []

	#extracting command structure
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

	#if we have no matches, redirect to examples
	if len(schools) == 0 and len(locations) == 0 and len(majors) == 0 and len(careers) == 0:
		package = {
			"operation":"undefined",
			"query":sent_query
		}
		resp = json.dumps(package)
		return resp

	#api calls and responses
	if len(schools) >= 1:
		package = {
			"operation":command,
			"query":sent_query,
			"schools":[]
		}
		for s in schools:
			package["schools"].append({"name":s})

		url = "https://trycents.com/api/v2/schools/compare"
		resp = hp.post_with_response(url,package)

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
		resp = hp.post_with_response(url,package)

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
		resp = hp.post_with_response(url,package)

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
		resp = hp.post_with_response(url,package)

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

###################################################################
#
#	Flask route for 1 or 2 field requests from examples/data pages
#	
#	Author: Austin Hammer
#
###################################################################
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