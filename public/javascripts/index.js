$(document).ready( function() {

  var socket = io();
  var user = $('#username').text();

  scrollDown();

  $('#enter').submit( function() {
    var message = $('#m').val();

    if (message) {
      socket.emit('chat message', 
        {
          "message" : message,
          "user" : user
        });

      $('#m').val('');

      $.ajax({
        url: '/',
        type: 'POST',
        data: "message=" + message,
        success: function(data) {          
        }
      });

    }

    return false;
  });

  socket.on('chat message', function(data) {
    $('#messages').append($('<li>').text(data.message));
    scrollDown();
  });


  function scrollDown() {
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }


});