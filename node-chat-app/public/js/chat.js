const socket = io();

const form = document.getElementById('form')
const messageInput = document.getElementById('message-input');
const submitBtn = document.getElementById('submit-btn')
const locationBtn = document.getElementById('location-btn')
const messages = document.getElementById('messages')
const sidebar = document.getElementById('sidebar')

//templates
const messageTemplate = document.getElementById('message-template').innerHTML;
const locationTemplate = document.getElementById('location-template').innerHTML;
const sidebarTemplate = document.getElementById('sidebar-template').innerHTML;

const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})

const autoscroll = ()=>{
    const newMessage = messages.lastElementChild;

    const newMessageStyles  = getComputedStyle(newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin

    const visibleHeight = messages.offsetHeight;

    const containerHeight = messages.scrollHeight;

    const scrollOffset = messages.scrollTop + visibleHeight;

    if(containerHeight - newMessageHeight <= scrollOffset){
        messages.scrollTop = messages.scrollHeight;
    }
}

socket.on('message', (message)=>{
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    messages.insertAdjacentHTML('beforeend', html);
    autoscroll();
})

socket.on('roomData', ({ room, users })=>{
    const html =Mustache.render(sidebarTemplate, {
        room,
        users
    })
    sidebar.innerHTML = html;
})

socket.on('locationMessage', (location)=>{
    const html = Mustache.render(locationTemplate, {
        username: location.username,
        url: location.url,
        createdAt: moment(location.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html);
    autoscroll()
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    submitBtn.setAttribute('disabled', 'disabled');

    socket.emit('sendMessage', messageInput.value, (error)=>{
        submitBtn.removeAttribute('disabled')
        messageInput.value = '';
        messageInput.focus();
        if(error){
            return console.log(error);
        }
        console.log("The message was sent succesfully!");
    });
})

locationBtn.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert("Geolocation is not supported by your browser!")
    }
    locationBtn.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((location)=>{
        socket.emit('sendLocation', {latitude: location.coords.latitude, longitude: location.coords.longitude}, ()=>{
            locationBtn.removeAttribute('disabled')
            console.log("Location shared!");
        })
    })
})

socket.emit('join', {username, room}, (error)=>{
    if(error){
        alert(error);
        location.href = '/'
    }
})