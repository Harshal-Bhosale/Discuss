//alert("hello");
const socket = io('http://localhost:8000', { transports : ['websocket'] });

const form = document.getElementById("send-form");
const messageInput = document.getElementById("msg-input");
const messageContainer = document.querySelector(".chatbox");

const append = (message, position )=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
// submit event listener
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send',message);
    var audios = new Audio('Resources/sent.mp3'); 
    audios.play();   
    messageInput.value=''
})
const uname =prompt("Enter your name to join chat");
socket.emit('new-user-joined', uname);

socket.on('user-joined', name =>{
    var audioj = new Audio('Resources/join.mp3'); 
    audioj.play();       
append(`${name} joined the chat`,'mid');
})  

socket.on('recive', data =>{
 var audior = new Audio('Resources/recieved.mp3'); 
 audior.play();   
append(`${data.name} : ${data.message} `,'left');
})

socket.on('left', name =>{
append(`${name} left the chat. `,'mid');
})