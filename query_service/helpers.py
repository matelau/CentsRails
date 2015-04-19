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

    return res
