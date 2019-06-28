import React, { useState } from "react";
import clsx from "clsx";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const fs = require("fs");
const path = require("path");
const defaultConnectionSettings = require("../../../defaultConnection.json");

console.log(path.join(__dirname));

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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

const writeToUserFile = obj => {
  fs.writeFile(
    path.join(__dirname, "..", "userConnection.txt"),
    obj,
    "utf8",
    function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("User connection specified");
      }
    }
  );
};

const prepareObjForTxt = obj => {
  writeToUserFile(Object.values(obj).join("\n"));
};

const Login = props => {
  const classes = useStyles();
  const [values, setValues] = useState(defaultConnectionSettings);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.history.push("/dbs");
    prepareObjForTxt(values);
  };

  return (
    <form className={classes.container} noValidate onSubmit={handleSubmit}>
      <TextField
        label='Database Type'
        type='text'
        name='databaseType'
        className={classes.textField}
        value={values.databaseType}
        onChange={handleInputChange}
        placeholder={values.databaseType}
      />
      <TextField
        label='Port'
        type='text'
        name='port'
        className={classes.textField}
        value={values.port}
        onChange={handleInputChange}
        placeholder={values.port}
      />
      <TextField
        label='User'
        type='text'
        name='user'
        className={classes.textField}
        value={values.user}
        onChange={handleInputChange}
        placeholder={values.user}
      />
      <TextField
        label='Password'
        type='text'
        name='password'
        className={classes.textField}
        value={values.password}
        onChange={handleInputChange}
        placeholder={values.password}
      />
      <TextField
        label='Database Type User'
        type='text'
        name='dbTypeUser'
        className={classes.textField}
        value={values.dbTypeUser}
        onChange={handleInputChange}
        placeholder={values.dbTypeUser}
      />
      <TextField
        label='Database Type Password'
        type='text'
        name='dbTypePassword'
        className={classes.textField}
        value={values.dbTypePassword}
        onChange={handleInputChange}
        placeholder={values.dbTypePassword}
      />
      <TextField
        label='Volumes'
        type='text'
        name='volumes'
        className={classes.textField}
        value={values.volumes}
        onChange={handleInputChange}
        placeholder={values.volumes}
      />
      <Button variant='contained' type='submit'>
        Submit
      </Button>
    </form>
  );
};

export default withRouter(Login);
