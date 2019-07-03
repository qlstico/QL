import React, { useState, useEffect } from 'react';
import storage from 'electron-json-storage';
import { withRouter } from 'react-router-dom';
const { ipcRenderer } = require('electron');
import { Login } from '../components/index';

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
  user: '',
  password: '',
  server: 'localhost',
  dbTypePassword: '',
  databaseName: '',
};

const Create = props => {
  defaultConnectionSettings.id = generateID();
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
    ipcRenderer.send('LOGIN_FORM_DATA', values);
    props.history.push('/');
  };

  return (
    <Login
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      values={values}
    />
  );
};

export default withRouter(Create);
