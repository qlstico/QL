const pg = require('pg')
const storage = require('electron-json-storage');
const {app} = require('electron')
const electron = require('electron')

const pool = new pg.Pool ({
    user: 'sri', // env var: PGUSER
    database: '', // env var: PGDATABASE
    password: '', // env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    idleTimeoutMillis: 300 // how long a client is allowed to remain idle before being closed
});

export let obj;

export function setstorage(obj){
  storage.set('dbnames', obj, function(error) {
    if (error) throw error;
  });
}

pool.query("SELECT datname FROM pg_database WHERE datistemplate = false",(err,res) => {
  obj = res.rows.map(({datname}) => {
    return datname
  })
  console.log(obj);
  pool.end()
});
