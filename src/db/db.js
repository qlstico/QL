const pg = require('pg');
// const storage = require('electron-json-storage');
// const {app} = require('electron')

const DB_CONNECTION = {
  user: '', // env var: PGUSER
  database: '', // env var: PGDATABASE
  password: '', // env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, // env var: PGPORT
  idleTimeoutMillis: 300, // how long a client is allowed to remain idle before being closed
};

const setDatabase = dbName => {
  DB_CONNECTION.database = dbName;
};

const getAllDbs = async () => {
  const pool = new pg.Pool(DB_CONNECTION);
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

const getAllTables = async database => {
  setDatabase(database);
  const pool = new pg.Pool(DB_CONNECTION);
  try {
    const response = await pool.query(
      `SELECT table_name FROM  information_schema.tables
      WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema', 'management','postgraphile_watch') and table_name != '_Migration'`
    );
    // console.log(response);
    return response.rows.map(({ table_name }) => table_name);
  } catch (error) {
    console.log(error);
  }
};

const getTableData = async (table, database) => {
  setDatabase(database);
  const pool = new pg.Pool(DB_CONNECTION);
  try {
    const response = await pool.query(`SELECT * from ${table}`);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};

const updateTableData = async (table, database, data) => {
  setDatabase(database);
  console.log('hi from updateTableData', table, database, data);

  /**
   * grab key from
   */
  const obj = data.reduce((accum, row) => {
    // get key from cell and create object with key of id and value of field(ie key)=value
    const id = row[0].id;
    return { [id]: row.map(({ key, value }) => `${key}=${value}`).join(' ') };
  }, []);
  // const str = data.map(({key, value}) => )
  const pool = new pg.Pool(DB_CONNECTION);

  try {
    // const response = await pool.query(
    //   `UPDATE ${table} SET ${newArr.join(' ')} where id = ${dbRowId}`
    // );
    // console.log(response);
    // return response.rows;
  } catch (error) {
    console.log(error);
  }
};

/*
const updateTableData = async (table, database, fields, values, dbRowId) => {
  setDatabase(database);
  const newArr = [];
  for (let index = 0; index < fields.length; index++) {
    newArr.push(`${fields}=${values}`);
  }

  const pool = new pg.Pool(DB_CONNECTION);
  try {
    const response = await pool.query(
      `UPDATE ${table} SET ${newArr.join(' ')} where id = ${dbRowId}`
    );
    console.log(response);
    return response.rows;
  } catch (error) {
    console.log(error);
  }
};
*/
console.log();

module.exports = {
  getAllTables,
  getAllDbs,
  getTableData,
  updateTableData,
};
