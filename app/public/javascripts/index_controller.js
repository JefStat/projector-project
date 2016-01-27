$(document).ready(function(){
  console.log('Starting slick');  
  $('#slick').slick();
  console.log('Connecting over socket.io');
  var socket = io();
  socket.on('Message', function(tweet){
    console.log('Message recieved ', tweet);
    $('#tweet-text').text(tweet.text);
  });
});