// Making request from clint to server to open a websocket and keep connection open
var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
})

socket.on('disconnect', function() {
  console.log('Disconnect from server');
})


// Send new message 
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAT).format('h:mm a');
  var li = $('<li></li>');

  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  $('#messages').append(li);
})


// Send new locatioin
socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var  a = $('<a target="_blank">My courrent location</a>');
    var formattedTime = moment(message.createdAT).format('h:mm a');

    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href',message.url);
    li.append(a);

    $('#messages').append(li);
});


$('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = $('#send-location');

locationButton.on('click',function(){
  if(! navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Send location ...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  },function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
