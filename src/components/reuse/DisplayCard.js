import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import dbImage from '../../assets/images/db-icon.png';
import tableImage from '../../assets/images/table-icon.png';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  pos: {
    marginBottom: 0
  }
});

function DisplayCard(props) {
  const classes = useStyles();
  const tablesPath = '/tables';

  return (
    <Card className={classes.card}>
      <CardContent>
        <img
          src={props.type === 'db' ? dbImage : tableImage}
          height="5%"
          width="5%"
        />
        <Typography className={classes.pos} color="textSecondary">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() =>
            props.type === 'db'
              ? props.history.push(tablesPath)
              : props.history.push('/')
          }
          size="small"
        >
          Connect
        </Button>
      </CardActions>
    </Card>
  );
}

export default withRouter(DisplayCard);