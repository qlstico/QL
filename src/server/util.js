const SimpleCrypto = require("simple-crypto-js").default;

function closeServer(server, message) {
  if (server) {
    server.close(function() {
      console.log(message);
    });
    server.destroy();
  }
}

var _secretKey = "some-unique-key";
var simpleCrypto1 = new SimpleCrypto(_secretKey);
var simpleCrypto2 = new SimpleCrypto(_secretKey);


function encrypt(password,task){
  if(task === "encrypt"){
    let cipherText = simpleCrypto1.encrypt(password)
    return(cipherText);
  }else if (task === "decrypt"){
    let decipherText = simpleCrypto2.decrypt(password);
    return(decipherText);
  }
}


module.exports = {
  closeServer, encrypt
};
