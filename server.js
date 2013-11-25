var login = require('./src/auth.js').login;
var express = require('express');

var app =  express();


app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: 'something'}));

app.use(express.static(__dirname + '/public'));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

app.post('/login', function(req, res) {
    login(req.body.login, req.body.password, function(done) {
        if( done ) {
            req.session.user = req.body.login;
            res.send('You\'re authenticated');
        }else{
            res.send('Authentication failed');
        }
    });
});

app.get('/whoami', function(req, res) {
    if ( req.session.user == undefined ) {
        res.send('You aren\'t logged');
        return;
    }

    res.send('You are ' + req.session.user);
});

app.listen(8080);
