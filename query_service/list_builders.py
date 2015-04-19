import requests

def make_major_list():
	murl = "https://trycents.com/api/v2/degrees?only_level_names=false"
	r = requests.Request("GET",murl,headers={'Accept':'application/json'})
	mprep = r.prepare()
	ms = requests.Session()
	ms.verify = False
	mresp = ms.send(mprep)

	return json.loads(mresp.text)

def make_city_list():
	cpac = {
		"operation":"get",
		"tables":[
			"cost of living"
		]
	}

	cpayload = json.dumps(cpac)
	curl = "https://trycents.com/api/v1/record_names/"
	r = requests.Request("POST",curl,headers={'Content-Type':'application/json','Accept':'application/json'},data=cpayload)
	cprep = r.prepare()
	cs = requests.Session()
	cs.verify = False
	cresp = cs.send(cprep)

	return json.loads(cresp.text)

def make_career_list():
	curl = "https://trycents.com/api/v2/careers"
	r = requests.Request("GET",curl,headers={'Accept':'application/json'})
	cprep = r.prepare()
	cs = requests.Session()
	cs.verify = False
	cresp = cs.send(cprep)

	cars = json.loads(cresp.text)