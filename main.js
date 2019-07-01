'use strict';

// Import parts of electron to use
const { app, BrowserWindow, ipcMain } = require('electron');
const storage = require('electron-json-storage');
const path = require('path');
const url = require('url');
const {
  getAllDbs,
  getAllTables,
  getTableData,
} = require('./src/components/db');
const express = require('express');
const { postgraphile } = require('postgraphile');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const expressApp = express();

function setupExpress(databaseName, username = '', password) {
  const schemaName = 'public';
  const database = `postgres://${username}:${
    password ? `${password}` : ''
  }@localhost:5432/${databaseName}`;
  const pglConfig = {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  };
  expressApp.use(postgraphile(database, schemaName, pglConfig));

  expressApp.listen(5000);
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
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
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

ipcMain.on('login-form-data', (event, arg) => {
  console.log(arg); // prints values from form
  storage.get('connectionData', (err, data) => {
    if (err) console.log(err);
    console.log(data);
  });
});

ipcMain.on('GET_DB_NAMES', async event => {
  const dbNames = await getAllDbs();
  event.reply('GET_DB_NAMES_REPLY', dbNames);
});

ipcMain.on('GET_TABLE_NAMES', async (event, arg) => {
  setupExpress(arg);
  const tableNames = await getAllTables(arg);

  event.reply('GET_TABLE_NAMES_REPLY', tableNames);
});

ipcMain.on('GET_TABLE_CONTENTS', async (event, args) => {
  const tableData = await getTableData(...args);
  event.reply('GET_TABLE_CONTENTS_REPLY', tableData);
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
