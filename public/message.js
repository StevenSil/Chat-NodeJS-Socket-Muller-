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


	 new_user.click(function(){
        console.log("hola")
        $.post("http://localhost:3000/user", 
                {      
                user: $("#nombre_usuario").val(),
                name: $("#nombre_prin").val(),
                lastname: $("#lastname").val()
                }
        , function(result){
          alert("Dato guardado")
          $("#nombre_usuario").val('')
          $("#nombre_prin").val('')
          $("#lastname").val('')
        });
    })
    

    destino.click(function(){
        chat_id = ""
        chatroom.html('')
        let url = "http://localhost:3000/user?user=" + $("#des_username").val() 
        if(usuario == ""){
            alert( "Ingrese su nombre de usuario" );
            return;
        } else if ($("#des_username").val().trim() == "") {
            alert( "Ingrese username del destino" );
            return;
        }
        $.get(url, function(data){  
            if(data['body'] == ""){
                alert( "Nombre de usuario no encontrado" );
                return;
            }
            $.each(data['body'], function (i, item) {
                destiny = item['_id']
                name_destiny = item['user']
                console.log(destiny)
            })
        })
        .done(function(){
            let enviado = ""
            let destinado = ""
            url = "http://localhost:3000/chat/" + destiny
            console.log(url)
            $.get(url, function(data){  
                $.each(data['body'], function (i, item) {
                    enviado = item['users'][0]['_id']
                    destinado = item['users'][1]['_id']
                    if(enviado == usuario && destinado == destiny || enviado == destiny && destinado == usuario){
                        console.log("Iguales")
                        chat_id = item['_id']
                        console.log("Chat id" + chat_id)
                    }
                })
            })
            .done(function(){
                alert("Username cargado correctamente")
                if(chat_id == ""){
                    console.log("No se enconto")
                    console.log(usuario)
                    console.log(destiny)
                    console.log({users:[usuario,destiny]})
                    $.post("http://localhost:3000/chat", 
                    {origen:usuario,
                    destino:destiny}
                    ,function(result){
                        let enviado = ""
                        let destinado = ""
                        url = "http://localhost:3000/chat/" + destiny
                        console.log(url)
                        $.get(url, function(data){  
                            $.each(data['body'], function (i, item) {
                                enviado = item['users'][0]['_id']
                                destinado = item['users'][1]['_id']
                                if(enviado == usuario && destinado == destiny || enviado == destiny && destinado == usuario){
                                    console.log("Iguales")
                                    chat_id = item['_id']
                                    console.log("Chat id" + chat_id)
                                }
                            })
                        })
                    });
                }
            })
        })
    })

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

	send_username.click(function(){
        chat_id = ""
        destiny = ""
        chatroom.html('')
        let url = "http://localhost:3000/user?user=" + $("#username").val() 
        console.log(url)
        $.get(url, function(data){
            if(data['body'] == ""){
                alert( "Nombre de usuario no encontrado" );
                return;
            }
            $.each(data['body'], function (i, item) {
                usuario = item['_id']
                name_usuario = item['user']
                console.log("Se ejecuto")
                console.log(usuario)
            })
        })
        .done(function(){
            alert("Username cargado correctamente")
        })
    })
	
	
    sendmessage.click(function(){
        if(usuario == "" && destiny == ""){
            alert("Ingrese su username y el username del destino")
            return
        }else if (destiny == "") {
            alert("Ingrese el username del destino")
            return
        }else if (usuario == "") {
            alert("Ingrese su username")
            return
        }
        console.log(usuario)
        let date = new Date();
        var formData = new FormData(); 
        if($("input[name=file]")[0].files[0] != null){
            var uploadfile = $("input[name=file]")[0].files[0]; 
            formData.append("file", uploadfile);
        }
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
