
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.set('view cache', true);
//app.enable('view cache');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//var subscriber = JSON.parse( require('./subscriber.json') );
/*
var subscriber = fs.readFileSync('./subscriber.json', 'utf-8');
subscriber = JSON.parse( subscriber );
console.log( subscriber );
*/

var users = {
	tehdb : {
		'forename' : 'alex',
		'lastname' : 'h'
	},
	murs : {
		'forename' : 'evgeniya',
		'lastname' : 'p'
	}
};

app.get('/invite/:nick?', function(req, res){
	//var nick = req.params.nick;
	var nick = req.param('nick', 'noone');
	//res.render('invite', { title: nick, user : users[nick] });
	var user =  users[nick];

	if( typeof user === 'undefined') {
		res.status(302).redirect("/noone");
	} else {
		res.render('invite', { user : user, title : nick });
	}
});

app.get('/noone', function(req, res){
	res.render('noone', { title : 'досвидания' });
});

app.get('/red', function(req,res){
	res.status(302).redirect("/");
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
