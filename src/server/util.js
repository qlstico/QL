function closeServer(server, message) {
  if (server) {
    server.close(function() {
      console.log(message);
    });
    server.destroy();
  }
}

module.exports = {
  closeServer,
};
