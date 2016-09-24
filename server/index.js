//     Copyright (c) 2016-2017 Muthukrishnan muthu.com
//     MIT License - http://opensource.org/licenses/mit-license.php
var restify = require('restify');
var levelup = require('levelup');
var uuid = require('uuid');
//-----------initialize leveldb-------------//
// 1) Create our database, supply location and options.
//    This will create or open the underlying LevelDB store.
var db = levelup('./treehouse', { valueEncoding: 'json' })
    //-------//

///---------Initializing the server------------///
var server = restify.createServer({
    name: 'Edgar Data Server!',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.jsonp());
server.use(restify.bodyParser({ mapParams: true }));
server.use(
    function crossOrigin(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
);
//--------------Initializing server done--------------//

//----------Route operations-------------//
server.post('/data', function(req, res, next) {
    //res.send(201, req.body);
    var userid = req.body.userid;
    if (!userid) {
        userid = uuid.v4();
    }
    var data = {
        tt: req.body.title,
        pg: req.body.url,
        tx: req.body.text,
        ts: (new Date()).getTime()
    }
    var key = userid + '!' + data.ts
    db.put(key, data, function(err) {
        if (!err) {
            res.send({ 'msg': 'success', userid: userid });
        } else {
            res.send(500, { 'msg': 'error saving the post' });
        }
    })
});

server.get('/data/:userid', function(req, res, next) {
    //res.send(201, req.body);
    var userid = req.params.userid;
    var entries = []
    db.createReadStream({ start: userid + '!', end: userid + '!' + '\xff' })
        .on('data', function(entry) {
            entries.push(entry)
        })
        .on('close', function() {
            res.send(entries);
        })
});

server.del('/data/:userid/:postid', function(req, res, next) {
    var postid = req.params.postid;
    var userid = req.params.userid;
    var key = userid + '!' + postid;
    db.del(key, function(err) {
        if (!err) {
            res.send({ 'msg': 'success', userid: userid });
        } else {
            res.send(500, { 'msg': 'error deleting the post' });
        }

    });
})

server.listen(8070, function() {
    console.log('%s listening at %s', server.name, server.url);
});
