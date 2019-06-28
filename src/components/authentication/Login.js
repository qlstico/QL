import React, { useState } from 'react';
const defaultConnectionSettings = require('../../../defaultConnection.json');
const storage = require('electron-json-storage');

const Login = () => {
  const [values, setValues] = useState(defaultConnectionSettings);

  const writeToLocalStorage = obj => {
    const databaseSetConnectionData = Object.values(obj).join('\n');
    storage.set('connectionData', databaseSetConnectionData, function(error) {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="databaseType">Database Type: </label>
      <input
        type="text"
        name="databaseType"
        value={values.databaseType}
        onChange={handleInputChange}
        placeholder={values.databaseType}
      />
      <label htmlFor="port">Port: </label>
      <input
        type="text"
        name="port"
        value={values.port}
        onChange={handleInputChange}
        placeholder={values.port}
      />
      <label htmlFor="user">User: </label>
      <input
        type="text"
        name="user"
        value={values.user}
        onChange={handleInputChange}
        placeholder={values.user}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="text"
        name="password"
        value={values.password}
        onChange={handleInputChange}
        placeholder={values.password}
      />
      <label htmlFor="dbTypeUser">Database Type User: </label>
      <input
        type="text"
        name="dbTypeUser"
        value={values.dbTypeUser}
        onChange={handleInputChange}
        placeholder={values.dbTypeUser}
      />
      <label htmlFor="dbTypePassword">Database Type Password: </label>
      <input
        type="text"
        name="dbTypePassword"
        value={values.dbTypePassword}
        onChange={handleInputChange}
        placeholder={values.dbTypePassword}
      />
      <label htmlFor="volumes">Volumes: </label>
      <input
        type="text"
        name="volumes"
        value={values.volumes}
        onChange={handleInputChange}
        placeholder={values.volumes}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
