const pg = require('pg');
// const storage = require('electron-json-storage');
// const {app} = require('electron')

const pool = new pg.Pool({
  user: '', // env var: PGUSER
  database: '', // env var: PGDATABASE
  password: '', // env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, // env var: PGPORT
  idleTimeoutMillis: 300, // how long a client is allowed to remain idle before being closed
});

const getAllDbs = async () => {
  try {
    const response = await pool.query(
      'SELECT datname FROM pg_database WHERE datistemplate = false'
    );
    const arrayOfDbNames = response.rows.map(({ datname }) => {
      return datname;
    });
    return arrayOfDbNames;
  } catch (error) {
    console.log(error);
  }
};

// getAllDbs().then(data => console.log('data', data));

exports.getAllDbs = getAllDbs;
