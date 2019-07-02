import React, { useState, useEffect, useContext } from 'react';
import { DbRelatedContext } from '../components/index';
import storage from 'electron-json-storage';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    ipcRenderer.send('login-form-data', thisUser);
    props.history.push('/');
  };

  return (
    thisUser && (
      <div>
        <h1>Hello, QLstico!</h1>
        <h1>Redefining databse access starts here!</h1>
        <form className={classes.container} noValidate onSubmit={handleSubmit}>
          <TextField
            label="User"
            type="text"
            name="user"
            className={classes.textField}
            value={thisUser.user}
            onChange={handleInputChange}
            placeholder={thisUser.user}
          />
          <TextField
            label="Password"
            type="text"
            name="password"
            className={classes.textField}
            value={thisUser.password}
            onChange={handleInputChange}
            placeholder={thisUser.password}
          />
          <TextField
            label="Server"
            type="text"
            name="server"
            className={classes.textField}
            value={thisUser.server}
            onChange={handleInputChange}
            placeholder={thisUser.server}
          />
          <TextField
            label="Database Name"
            type="text"
            name="databaseName"
            className={classes.textField}
            value={thisUser.databaseName}
            onChange={handleInputChange}
            placeholder={thisUser.databaseName}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    )
  );
};

export default withRouter(Edit);
