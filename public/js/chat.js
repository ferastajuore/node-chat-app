// Making request from clint to server to open a websocket and keep connection open
var socket = io();

function scrollToBottom() {
  // Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('Connected to server');


  socket.on('updateUserList', function (users) {
    var ol = $('<ol></ol>');

    users.forEach((user) => {
      ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
  })

  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err){
    if(err){
      alert(err)
      window.location.href = '/';
    }else{
      console.log('no error');
    }
  });

});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});



// Send new message 
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAT).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })

  $('#messages').append(html);
  scrollToBottom();
})


// Send new locatioin
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAT).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});


$('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
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
