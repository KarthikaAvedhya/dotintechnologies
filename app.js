var express = require('express');
var path = require('path');

var usersRouter = require('./routes/users');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/user', usersRouter);
app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var listener = app.listen(8080, function(){
    console.log('Listening on port ' + listener.address().port); 
});


module.exports = app;
