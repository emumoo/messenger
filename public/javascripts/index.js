$(document).ready( function() {

  var socket = io();

  scrollDown();

  $('#enter').submit( function() {
    var message = $('#m').val();
    socket.emit('chat message', message);
    $('#m').val('');

    $.ajax({
      url: '/',
      type: 'POST',
      data: "message=" + message,
      success: function(data) {
        
      }
    });

    return false;
  });

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
    scrollDown();
  });


  function scrollDown() {
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }

});