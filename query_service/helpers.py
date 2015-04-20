import requests
import json
from random import randint

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

def get_rand(mn,mx):
    return randint(mn,mx);

def make_tups(s,n,r):
    for i in xrange(0,len(s)-(n-1)):
        el = ()
        for j in xrange(0,n):
            el = el + (s[i+j],)
        r.append(el)

def build_engram(s):
    arr = s.split(" ")
    res = []

    for a in arr:
        res.append((a,))

    res.append(tuple(arr,))

    for x in xrange(2,len(arr)):
        make_tups(arr,x,res)

    if ("of",) in res:
        res.remove(("of",))

    if ("in",) in res:
        res.remove(("in",))

    return res

def send_request(url,package):
    payload = json.dumps(package)
    r = requests.Request("POST",url,headers={'Content-Type':'application/json','Accept':'application/json'},data=payload)
    prep = r.prepare()
    s = requests.Session()
    s.verify = False
    resp = s.send(prep)
    return resp.text

def send_get(url,qtype):
    r = requests.Request("GET",url,headers={'Content-Type':'application/json','Accept':'application/json'})
    prep = r.prepare()
    s = requests.Session()
    s.verify = False
    resp = s.send(prep)
    package = json.loads(resp.text)
    package["query_type"] = qtype
    return json.dumps(package)
