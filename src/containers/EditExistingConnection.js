import React, { useState, useEffect, useContext } from 'react';
import { DbRelatedContext } from '../components/index';
import storage from 'electron-json-storage';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const { ipcRenderer } = require('electron');
import { Login } from '../components/index';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const Edit = props => {
  const classes = useStyles();
  const [thisUser, setThisUser] = useState(null);
  const [connectionsArray, setConnectionsArray] = useState(null);
  const { selectedUser, setSelectedUser } = useContext(DbRelatedContext);

  useEffect(() => {
    storage.get('connectionData', (error, data) => {
      if (error) throw error;
      const edittableUser = data.find(user => user.id === selectedUser.id);
      setThisUser(edittableUser);
      setConnectionsArray(data);
    });
  }, []);

  const writeToLocalStorage = () => {
    storage.set(
      'connectionData',
      connectionsArray.map(user => (user.id === thisUser.id ? thisUser : user)),
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
    ipcRenderer.send('LOGIN_FORM_DATA', thisUser);
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
