import React, { useState } from 'react';
import storage from 'electron-json-storage';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CommunicationStayPrimaryLandscape } from 'material-ui/svg-icons';
const defaultConnectionSettings = require('../../../defaultConnection.json');
const { ipcRenderer } = require('electron');

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

const Login = props => {
  const classes = useStyles();
  const [values, setValues] = useState(defaultConnectionSettings);

  const writeToLocalStorage = formData => {
    let lsData;
    storage.get('connectionData', (error, data) => {
      if (error) throw error;
      lsData = data;
      console.log(lsData);
    });
    // if there is nothing in lsData, then turn form data into an array and then set it
    const newArray = Array.isArray(lsData)
      ? lsData.concat(formData)
      : [formData];
    console.log(newArray);
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
    props.history.push('/dbs');
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

export default withRouter(Login);
