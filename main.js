'use strict';

// Import parts of electron to use
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');
const {
  getAllDbs,
  getAllTables,
  getTableData,
  updateTableData,
  createTable,
  removeTableRow,
  deleteTable,
  createDatabase,
  setUserProvidedDbConnection,
  deleteDatabase
} = require('./src/db/db');
const express = require('express');
const { postgraphile } = require('postgraphile');
// need below for visualizer
const { express: voyagerMiddleware } = require('graphql-voyager/middleware');
const { closeServer } = require('./src/server/util');
const {
  LOGIN_FORM_DATA,
  GET_DB_NAMES,
  GET_DB_NAMES_REPLY,
  GET_TABLE_NAMES,
  GET_TABLE_NAMES_REPLY,
  GET_TABLE_CONTENTS,
  GET_TABLE_CONTENTS_REPLY,
  CLOSE_SERVER,
  UPDATE_TABLE_DATA,
  CREATE_TABLE,
  CREATE_TABLE_REPLY,
  REMOVE_TABLE_ROW,
  ADD_TABLE_ROW,
  GET_OS_USER,
  GET_OS_USER_REPLY,
  CREATE_DATABASE,
  CREATE_DATABASE_REPLY,
  DELETE_TABLE,
  DELETE_TABLE_REPLY,
  SET_USER_DB_CONNECTION,
  DELETE_DATABASE,
  DELETE_DATABASE_REPLY
} = require('./src/constants/ipcNames');
const enableDestroy = require('server-destroy');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let LOGGEDIN_USER = '';

let expressApp;
let expressServer;
let PORT_INCREMENT = 0;

/* Setup express server when user clicks a db in the front end */
function setupExpress(databaseName, username = '', password) {
  /* Major key is just overwriting existing express app.
  This was the solution */
  expressApp = express();
  // config to connect middleware to database
  const schemaName = 'public';
  const database = `postgres://${username}:${
    password ? `${password}` : ''
  }@localhost:5432/${databaseName}`;
  const pglConfig = {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true
  };
  // console.log(database);
  // setup middleware for creating our graphql api
  expressApp.use(postgraphile(database, schemaName, pglConfig));
  // route for visualizer - access via http://localhost:5000/voyager
  expressApp.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

  // assign global var our express server so we can close it later
  expressServer = expressApp.listen(5000, function() {
    console.log('Listening :)');
    // expressServer.close()
  });

  // enhance with a 'destroy' function
  enableDestroy(expressServer);

  // expressApp.listen(5000);
}

// Keep a reference for dev mode
let dev = false;

if (
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  dev = true;
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: `localhost:${process.env.PORT || 9000}`,
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }

  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Open the DevTools automatically if developing
    if (dev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

/*
 * ipcMain
 * allows us to safely listen for and send communications to front end
 */

/*
 * called from below components to send connection data from connection forms
 * ./containers/EditExistingConnection.js
 * ./containers/CreateConnection.js
 */
ipcMain.on(LOGIN_FORM_DATA, (_, formData) => {
  // console.log('arg in login-form-data', arg); // prints values from form
  const { user } = formData; // take value from form
  // added to global var so we can use for db connection
  LOGGEDIN_USER = user;
});

ipcMain.on(GET_OS_USER, event => {
  const { username } = os.userInfo();
  event.reply(GET_OS_USER_REPLY, username);
});

/**
 * called from ./components/reuse/Header.js
 * when user clicks refresh icon, header sends message to trigger
 * call to get all the db names and replies with the database names
 */
ipcMain.on(GET_DB_NAMES, async event => {
  const dbNames = await getAllDbs();
  // reply with database names from query
  event.reply(GET_DB_NAMES_REPLY, dbNames);
});

/**
 * called from ./components/db/AllDBs.js
 * when user clicks database, sends message to trigger creating a db
 * and replies with updated array of all db names after dletion
 */
ipcMain.on(CREATE_DATABASE, async (event, databaseName) => {
  const existingDatabases = await createDatabase(databaseName);
  // reply with database names from query
  event.reply(CREATE_DATABASE_REPLY, existingDatabases);
});

/**
 * called from ./components/db/AllDBs.js
 * when user clicks database, sends message to trigger delete a db
 * and replies with updated array of all db names after dletion
 */
ipcMain.on(DELETE_DATABASE, async (event, databaseName) => {
  const existingDatabases = await deleteDatabase(databaseName);
  // reply with database names from query
  event.reply(DELETE_DATABASE_REPLY, existingDatabases);
});

/**
 * called from ./components/db/AllDBs.js
 * when user clicks database, sends message to trigger getting the table data
 * call to get all the table names and replies with the tableNames
 */
ipcMain.on(GET_TABLE_NAMES, async (event, dbname) => {
  // when it's not just us testing, we should pass in LOGGEDIN_USER
  setupExpress(dbname);
  const tableNames = await getAllTables(dbname);
  event.reply(GET_TABLE_NAMES_REPLY, tableNames);
});

/**
 * called from ./components/db/AllTables.js
 * when user clicks specific table, we recieve call
 * get all the table data and replies with the table data
 */
ipcMain.on(GET_TABLE_CONTENTS, async (event, args) => {
  // args === (table, selectedDb)
  const tableData = await getTableData(...args);
  event.reply(GET_TABLE_CONTENTS_REPLY, tableData);
});

/**
 * called from ./components/reuse/Header.js
 * when user qlStico icon, header sends message to trigger stopping the server
 * from rec new connections
 * call to get all the db names and replies with the database names
 */
ipcMain.on(CLOSE_SERVER, async (event, args) => {
  closeServer(expressServer, 'closeserver*****');
});

/**
 * called from ./components/db/IndivTable.js
 * when the user submits the changes to the table
 */
// args === [selectedTable,selectedDb,tableMatrix]
ipcMain.on(UPDATE_TABLE_DATA, async (_, args) => {
  const response = await updateTableData(...args);
});

/**
 * called from ./components/db/allTables.js
 * when the user submits request for a new table
 */
// args === [selectedDb, newTableName]
ipcMain.on(CREATE_TABLE, async (event, args) => {
  const newTableAddition = await createTable(...args);
  event.reply(CREATE_TABLE_REPLY, newTableAddition);
});

/**
 * called from ./components/db/allTables.js
 * when the user submits request for deleting table
 */
// args === [selectedDb, selectedTableName]
ipcMain.on(DELETE_TABLE, async (event, args) => {
  const tablesAfterDeletion = await deleteTable(...args);
  event.reply(DELETE_TABLE_REPLY, tablesAfterDeletion);
});

/**
 * called from ./components/db/IndivTable.js
 * when the user submits request for deleting a row in the grid
 */
// args === [selectedTable, selectedDb, selectedRowId]
ipcMain.on(REMOVE_TABLE_ROW, async (_, args) => {
  await removeTableRow(...args);
});

/**
 * called from ./components/db/ConnectPage.js
 * when the user submits request for login with a specific connection tile
 */
ipcMain.on(SET_USER_DB_CONNECTION, async (_, userConfig) => {
  await setUserProvidedDbConnection(userConfig);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
