var express = require("express");
var mongoose = require("mongoose");
var app = express();
var port = 5000;
var connURI = "mongodb://dbuser:12345@ds155577.mlab.com:55577/chatmaster";
mongoose.connect(connURI, {  
    useMongoClient: true  
}, (err) => {  
    console.log("Database connection FAILED", err)  
})
  
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views/templates');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("index");
}); 


var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chatmaster.' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});