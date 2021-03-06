import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import graphQlLogo from '../../assets/images/graphql.png';

const useStyles = makeStyles({
  card: {
    height: 150,
    width: 150
  },
  pos: {
    marginBottom: 0
  }
});

const openGraphiql = () => {
  window.open('http://localhost:5000/graphiql', '_blank', 'nodeIntegration=no');
};

function GraphQLDisplayCard() {
  const classes = useStyles();

  return (
    <Button onClick={() => openGraphiql()} size="large" align="center">
      <Card className={classes.card}>
        <CardContent>
          <img src={graphQlLogo} height="60%" width="60%" />

          <Typography
            className={classes.pos}
            align="center"
            color="textSecondary"
          >
            *graphQL Queries
          </Typography>
        </CardContent>
        <CardActions />
      </Card>
    </Button>
  );
}

export default GraphQLDisplayCard;
