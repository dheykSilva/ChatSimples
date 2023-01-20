$(function(){
    const socket = io()
    socket.nickname = ''
    $('#form').submit(function(event){
        if(socket.nickname === ''){
            socket.nickname = $('#msg').val()
            socket.emit('login', $('#msg').val())
            $('#msg').keypress(function(event){
                socket.emit('status', socket.nickname + ' esta digitando!')
            })
            $('#msg').keyup(function(event){
                socket.emit('status', '')
            })
            socket.on('status', function(msg){
                $('#status').html(msg)
            })
        } else{
            socket.emit('message', $('#msg').val())
        }
        $('#msg').val('')
        return false
    })
    socket.on('message', function(msg){
        $('#exibe_mensagem').append($('<li>').text(msg))
    })
})

function trocaPlaceholder(){
    document.getElementById('msg').placeholder = 'Digite sua mensagem!';
}