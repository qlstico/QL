import React, { useState, useEffect, useContext } from 'react';
import { DbRelatedContext, Login } from '../components/index';
import storage from 'electron-json-storage';
import { withRouter } from 'react-router-dom';
import { ipcRenderer } from 'electron';
const { LOGIN_FORM_DATA } = require('../constants/ipcNames');
const { encrypt } = require('../server/util');


const Edit = props => {
  const [thisUser, setThisUser] = useState(null);
  const [connectionsArray, setConnectionsArray] = useState(null);
  const { selectedUser } = useContext(DbRelatedContext);

  useEffect(() => {
    storage.get('connectionData', (error, data) => {
      if (error) throw error;
      const edittableUser = data.find(user => user.id === selectedUser.id);
      let password = edittableUser.password
      let newpass = encrypt(password,"decrypt")
      edittableUser.password = newpass
      setThisUser(edittableUser);
      setConnectionsArray(data);
    });
  }, []);

  const writeToLocalStorage = () => {
    storage.set(
      'connectionData',
      connectionsArray.map(user => {
        if(user.id === thisUser.id) {
        thisUser.password = encrypt(thisUser.password,"encrypt")
        console.log(thisUser)
        return thisUser
      } else{
        return user
      }}),
      function(error) {
        if (error) throw error;
      }
    );
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setThisUser({ ...thisUser, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    writeToLocalStorage();
    ipcRenderer.send(LOGIN_FORM_DATA, thisUser);
    props.history.push('/');
  };

  return (
    thisUser && (
      <Login
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        values={thisUser}
      />
    )
  );
};

export default withRouter(Edit);
