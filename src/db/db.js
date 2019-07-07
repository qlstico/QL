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

// const tranformRowToSql = (id, row) => {
//   const valuesArr = [];
//   return [
//     row
//       .filter(
//         ({ key }) => key !== 'createdAt' && key !== 'updatedAt' //&& !/\w+id$/i.test(key)
//       )
//       .map(({ key, value }, idx) => {
//         // removes these two keys from the sql
//         // makes sure we are not converting ints to strings
//         valuesArr.push(value);
//         // postgresSQL is case sensitive so if we use camel case must wrap key in ""
//         return `"${key}" = $${idx + 1}`;
//       })
//       .join(', '),
//     valuesArr.concat(id),
//   ];
// };

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

const createTable = async (selectedDb, newTableName) => {
  setDatabase(selectedDb);
  const pool = new pg.Pool(DB_CONNECTION);
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS "${newTableName}" (
      "id" SERIAL PRIMARY KEY
      );`
    );

    const response = await pool.query(
      `SELECT table_name FROM  information_schema.tables
      WHERE table_type = 'BASE TABLE'
      AND table_schema NOT IN ('pg_catalog', 'information_schema', 'management','postgraphile_watch') and table_name != '_Migration'`
    );
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

const removeTableRow = (table, database, id) => {};

// const updateTableData = async (table, database, data) => {
//   setDatabase(database);
//   console.log({ DB_CONNECTION });
//   /**
//    * grab key from
//    */
//   const obj = data.reduce((accum, row) => {
//     // get key from cell and create object with key of id and value of field(ie key)=value
//     return accum.concat([tranformRowToSql(row[0].id, row)]);
//   }, []);
//   // console.log(obj);
//   // const str = data.map(({key, value}) => )
//   const pool = new pg.Pool(DB_CONNECTION);
//   const queryArr = obj.map(([updateStr, values]) => [
//     `UPDATE ${table} SET ${updateStr} WHERE id=$${values.length} returning *`,
//     values,
//   ]);
//   // console.log(...queryArr.map(([queryStr, params]) => ({ queryStr, params })));
//   // const [queryStr, params] = queryArr[0];
//   try {
//     queryArr.forEach(async ([queryStr, params]) => {
//       const { rows } = await pool.query(queryStr, params);
//       console.log(rows);
//     });
//     // console.log({ queryStr, params });
//     // const { rows } = await pool.query(`${queryStr}`, params);
//     // console.log(rows);
//     // const { rows } = await pool.query(
//     //   `UPDATE users SET email=$1 WHERE id=$2 returning *`,
//     //   ['jdwy215@me.com', 1]
//     // );
//     // console.log(rows);
//     // return response.rows;
//   } catch (error) {
//     console.log(error);
//   }
// };

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

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
// failing because they need commas between them in set
// const testUpdateTable = async (table = 'users', database = 'loggin', data) => {
//   setDatabase(database);
//   const pool = new pg.Pool(DB_CONNECTION);
//   const [queryStr, params] = data;
//   try {
//     const { rows } = await pool.query(`${queryStr}`, params);
//     console.log(rows);
//   } catch (error) {
//     console.error(error);
//   }
// };

// testUpdateTable('users', 'loggin', [
//   'UPDATE users SET email = $1, googleId = $2, imageUrl = $3, password = $4 WHERE id=$5 returning *',
//   [
//     'jdwy215@mec.com',
//     '101268191319555494355',
//     'https://lh3.googleusercontent.com/-5UxBs3uyzEY/AAAAAAAAAAI/AAAAAAAAAAA/BQOl6ImVh9k/photo.jpg',
//     null,
//     1,
//   ],
// ]);

const tranformCellToSql = ({ key, value, id }) => {
  return [`"${key}" = $${1}`, [value, id]];
};

const updateTableData = async (table, database, allUpdatedCells) => {
  console.log(allUpdatedCells);
  setDatabase(database);
  const pool = new pg.Pool(DB_CONNECTION);
  const keysAndParamsNestedArr = allUpdatedCells.reduce((accum, cell) => {
    // get key from cell and create object with key of id and value of field(ie key)=value
    return accum.concat([tranformCellToSql(cell)]);
  }, []);
  console.log({ keysAndParamsNestedArr });
  const queryArr = keysAndParamsNestedArr.map(([updateStr, values]) => [
    `UPDATE ${table} SET ${updateStr} WHERE id=$${values.length} returning *`,
    values,
  ]);
  console.log(
    'updateTableDataV2',
    ...queryArr.map(([queryStr, params]) => ({ queryStr, params }))
  );
  try {
    queryArr.forEach(async ([queryStr, params]) => {
      const { rows } = await pool.query(queryStr, params);
      console.log(rows);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTables,
  getAllDbs,
  getTableData,
  updateTableData,
  createTable,
  removeTableRow,
  // updateTableDataV2,
};
