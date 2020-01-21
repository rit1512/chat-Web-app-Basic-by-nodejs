var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
app.use(express.static(__dirname))
app.use(bodyParser.json());
var messages = []
app.get('/message', (req, res) => {
    res.send(messages)
})

app.post('/message', (req, res) => {
    messages.push(req.body)
    io.emit('message', req.body);
    res.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log("user Connect");

})

var server = http.listen(4000, () => {
    console.log("server is listening on port", server.address().port)
})