from flask import Flask
import nltk
import json
import csv
import requests
import re

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
		resp = {
			"operation":"not found",
			"query":query
		}
	else:
		package = {
			"operation":command,
			"search by":"location",
			"objects":[],
			"query":query
		}
		for l in locations:
			package["objects"].append({"city":l})
		url = "http://localhost:3000/api/v1/coli"
		payload = json.dumps(package)
		r = requests.post(url,payload)
		resp = r.json
	return resp

if __name__ == '__main__':
	app.run(debug=True)
