var usuario = "";
let chat_id = "";
var destiny = "";

name_usuario = "";
name_destiny = "";

$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000', {
                forceNew: true,
            })

    var sendmessage = $("#send_message")
    var message = $("#message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")
    var destino = $("#send_destiny")
    var new_user = $("#save_user")
 

    socket.on('message', (data) => {
        feedback.html('')
        message.val('')
        console.log(data)
        console.log(chat_id)
        console.log(data.chat)
        if(data.chat == chat_id){
            console.log(data.file)
            if(data.user != usuario){
                chatroom.append("<p class='message'>" + name_destiny + ": " + data.message + "</p>")
            }else{
                chatroom.append("<p class='message'>" + name_usuario + ": " + data.message + "</p>")
            }
            if (data.file != ""){
                chatroom.append("<img class='imagen' src=" + data.file + " id=img' width='200' height='200'> </p>")
            }
        }
    })


    sendmessage.click(function(){
        console.log(usuario)
        let date = new Date();
        var formData = new FormData(); 
        formData.append("chat", chat_id);
        formData.append("user", usuario);
        formData.append("message", $("#message").val());
        formData.append("date", date);
        var localurl = 'http://localhost:3000/message'
        $.ajax({ 
            url: localurl,  
            data: formData, 
            processData: false, 
            contentType: false, 
            type: 'POST', 
            success: function(data){ 
                console.log('response data', data);
                $("#file").val(''); 
            } 
        });
        
    });
});
