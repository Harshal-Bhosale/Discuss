//const { Socket } = require("socket.io");

const io = require("socket.io")(process.env.PORT || 8000)
console.log("Server listening ");

const users={};

io.on("connection", Socket =>{
    Socket.on('new-user-joined', name=>{
        console.log("new User :" + name);
        users[Socket.id] = name;
        Socket.broadcast.emit("user-joined", name);
    });

    Socket.on("send",message=>{
        Socket.broadcast.emit("recive",{message: message, name: users[Socket.id]})
    });

    //predefined discc event 
    Socket.on('disconnect', message =>{
        Socket.broadcast.emit('left' , users[Socket.id]);
        delete users[Socket.id];
    })  

});
