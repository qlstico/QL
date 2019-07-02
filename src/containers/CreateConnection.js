import React, { useState, useEffect } from 'react';
import storage from 'electron-json-storage';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// const defaultConnectionSettings = require('../../../defaultConnection.json');
const { ipcRenderer } = require('electron');
import { username } from '../components/scripts/scripts';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const generateID = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

const defaultConnectionSettings = {
  id: '',
  user: username,
  password: '',
  server: 'localhost',
  dbTypePassword: '',
  databaseName: ''
};

const Create = props => {
  defaultConnectionSettings.id = generateID();
  const classes = useStyles();
  const [values, setValues] = useState(defaultConnectionSettings);
  const [connectionData, setConnectionData] = useState(null);

  useEffect(() => {
    storage.get('connectionData', (error, data) => {
      if (error) throw error;
      setConnectionData(data);
    });
  }, []);

  const writeToLocalStorage = formData => {
    // if there is nothing in lsData, then turn form data into an array and then set it
    const newArray = Array.isArray(connectionData)
      ? connectionData.concat(formData)
      : [formData];
    storage.set('connectionData', newArray, function(error) {
      if (error) throw error;
    });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    writeToLocalStorage(values);
    ipcRenderer.send('login-form-data', values);
    props.history.push('/');
  };

  return (
    <div>
      <h1>Hello, QLstico!</h1>
      <h1>Redefining databse access starts here!</h1>
      <form className={classes.container} noValidate onSubmit={handleSubmit}>
        <TextField
          label="User"
          type="text"
          name="user"
          className={classes.textField}
          value={values.user}
          onChange={handleInputChange}
          placeholder={values.user}
        />
        <TextField
          label="Password"
          type="text"
          name="password"
          className={classes.textField}
          value={values.password}
          onChange={handleInputChange}
          placeholder={values.password}
        />
        <TextField
          label="Server"
          type="text"
          name="server"
          className={classes.textField}
          value={values.server}
          onChange={handleInputChange}
          placeholder={values.server}
        />
        <TextField
          label="Database Name"
          type="text"
          name="databaseName"
          className={classes.textField}
          value={values.databaseName}
          onChange={handleInputChange}
          placeholder={values.databaseName}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default withRouter(Create);
