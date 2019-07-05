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


function encryptPass(password){
  let cipherText = simpleCrypto1.encrypt(password);
  return(cipherText);
}

function decryptPass(password2){
  let decipherText = simpleCrypto2.decrypt(password2);
  return(decipherText);
}


// var plainText = "Hello World!";
// // Encryption using the first instance (simpleCrypto1)
// console.log("Encryption process...");
// console.log("Plain Text    : " + plainText);
// console.log("Cipher Text   : " + cipherText);
// // Decyption using the second instance (simpleCrypto2)
// var decipherText = simpleCrypto2.decrypt(cipherText);
// console.log("... and then decryption...");
// console.log("Decipher Text : " + decipherText);
// console.log("... done.");
//
//
// let pass = encryptPass("sri")
// console.log(pass)
// let pass2 = decryptPass(pass)
// console.log(pass2)
// console.log(decryptPass("51a7fec299fee15ed1e9adfc5d393a1065a2bc8757912aa22f061169a8cdfda0PyyRmRwap6JXnf7FRJjk+w=="));


// console.log("Encryption process...");
// console.log("Plain Text    : " + password);
// console.log("Cipher Text   : " + cipherText);
// let decipherText = simpleCrypto.decrypt(cipherText);
// console.log("... and then decryption...");
// console.log("Decipher Text : " + decipherText);
// console.log("... done.");


module.exports = {
  closeServer, encryptPass, decryptPass
};
