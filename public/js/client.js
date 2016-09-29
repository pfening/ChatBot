var socket = io();

$('#forma').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

socket.on('worlds', function(arr){
    $('#array').empty();
    $('#subject').empty();
    $('#action').empty();
  jQuery.each(arr, function(index, item) {
    $('#array').append($('<li>').text(item));
  });

  $('#array').ready(function(){
    $('li').mouseover(function(){
      $(this).css({ "color": "blue" });
      $(this).attr({"id":$(this).text(),"draggable":"true", "ondragstart":"drag(event)"});
      //socket.emit('selected', $(this).text());
    });
  });
});

$('#formb').submit(function(){
  socket.emit('answer',{ ans:$('#a').val(), sbj:$('#subject').text(), act:$('#action').text() } );
  $('#a').val('');
  return false;
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
