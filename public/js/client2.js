var socket = io();

$('#forma').submit(function(){
  socket.emit('teaching',{ ans:$('#a').val(), que:$('#q').val() } );
  $('#q').val('');
  $('#a').val('');
  return false;
});

socket.on('teaching', function(msg){
  $('#messages').append($('<li>').text(msg));
});


socket.on('chating', function(chata){
  $('#chat').append($('<li>').text(chata));
});

$('#formi').submit(function(){
  socket.emit('chating',{ chatq:$('#i').val() } );
  $('#i').val('');
  return false;
});
