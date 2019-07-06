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

// Helper Functions
const setDatabase = dbName => {
  DB_CONNECTION.database = dbName;
};

const tranformRowToSql = (id, row) => [
  id,
  row
    .map(({ key, value }) => {
      // removes these two keys from the sql
      if (key === 'createdAt' || key === 'updatedAt') {
        return ``;
      }
      // makes sure we are not converting ints to strings
      return `${key}=${typeof value === 'string' ? `"${value}"` : value}`;
    })
    .join(' '),
];

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
  // console.log('hi from updateTableData', table, database, data);

  /**
   * grab key from
   */
  const obj = data.reduce((accum, row) => {
    // get key from cell and create object with key of id and value of field(ie key)=value
    return accum.concat([tranformRowToSql(row[0].id, row)]);
  }, []);
  // console.log(obj);
  // const str = data.map(({key, value}) => )
  const pool = new pg.Pool(DB_CONNECTION);
  const queryArr = obj.map(
    ([rowId, updateStr]) => `UPDATE ${table} SET ${updateStr} WHERE id=${rowId}`
  );
  console.log(queryArr);

  try {
    // queryArr.forEach(async query => {
    //   const response = await pool.query(query);
    //   console.log(response);
    // });
    const { rows } = await pool.query(
      `UPDATE users SET email=$1 WHERE id=$2 returning *`,
      ['jdwy215@me.com', 1]
    );
    console.log(rows);
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
