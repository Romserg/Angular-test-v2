var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('userlist', ['userlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/src"));
app.use(bodyParser.json());

app.get('/userlist', function (req, res) {
    console.log("GET request received");
    db.userlist.find(function (err, users) {
        console.log(users);
        res.json(users);
    });
});

app.post('/userlist', function (req, res) {
    console.log(req.body);
    db.userlist.insert(req.body, function (err, user) {
        res.json(user);
    });
});

app.delete('/userlist/:id', function (req, res) {
    var id = req.params.id;
    db.userlist.remove({
        _id: mongojs.ObjectId(id)
    }, function (err, user) {
        res.json(user);
    });
});

app.get('/userlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.userlist.findOne({
        _id: mongojs.ObjectId(id)
    }, function (err, user) {
        res.json(user);
    });
});

app.put('/userlist/:id', function (req, res) {
    var id = req.params.id;
    db.userlist.findAndModify({
        query: {
            _id: mongojs.ObjectId(id)
        },
        update: {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                year: req.body.year
            }
        },
        new: true
    }, function(err, user){
        res.json(user);
    });
});

app.listen(3000);
console.log("Server running on port 3000");
