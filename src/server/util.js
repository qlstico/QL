
function closeServer(server, message){
  if(server){
  server.close(function() { console.log(message)});
}
}

module.exports = {
  closeServer
}
