const express = require('express')
const app = express()
const port = 3000 //http://localhost:3000
const http = require('http').Server(app)
const serverSocket = require('socket.io')(http)
const indexURL = 'C://Users//DKtga//Documents//JavaScript//Atividades//Atividade - 02//index.html'

app.use(express.static('server'))
app.use(express.static('scripts'))
app.use(express.static('visao'))

http.listen(port, function(){
    console.log('-------------------- SERVIDOR INICIADO --------------------\n')
})

app.get('/', function(request, response){
    response.sendFile(indexURL)
})

serverSocket.on('connection', function(socket){
    socket.on('login', function(nickname){
        serverSocket.emit('message', 'O usuario <' + nickname + '> conectou!')
        socket.nickname = nickname
    })
    socket.on('message', function(msg){
        serverSocket.emit('message', '<' + socket.nickname + '>' + ':  '+ msg)
    })
    socket.on('status', function(msg){
        socket.broadcast.emit('status', msg)
    })
})