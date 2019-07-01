/*
Do we still need this file? - I suspect we do not
*/
const os = require('os');
const { Client } = require('pg');
const client = new Client();
await client.connect();

const res = await client.query(
  'SELECT datname FROM pg_database WHERE datistemplate = false'
);
console.log(res); // Hello world!
await client.end();

//function to run processes on node terminal
function exec(
  cmd,
  handler = function(error, stdout, stderr) {
    console.log(stdout);
    if (error !== null) {
      console.log(stderr);
    }
  }
) {
  const childfork = require('child_process');
  return childfork.exec(cmd, handler);
}

const { homedir } = os.userInfo(); //getting users local dir
const path = `${homedir}/Library/`;
const path2 = 'Application\\' + ' Support/QLstico/storage';
const dir = path + path2;

exec(`cd ${dir} && ls `);
