import React from "react";
import { DisplayCard } from "../index";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import postGRES from "../../assets/images/postGRES.png";
import mongoDB from "../../assets/images/mongoDB.png";
import AWSDB from "../../assets/images/AWSDB.jpg";
import MYSQL from "../../assets/images/MYSQL.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  },
  card: {
    // minWidth: 275
    height: 250,
    width: 500
  },
  pos: {
    marginBottom: 0
  }
}));

const MainPage = props => {
  const [spacing] = React.useState(2);
  const classes = useStyles();

  return (
    <div>
      <h1>Compatibility with these databases coming soon! </h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={spacing}>
            <Button
              onClick={() =>
                props.type === "db"
                  ? props.history.push(tablesPath)
                  : props.history.push("/edit")
              }
              size='large'
            >
              <Grid item>
                <Card className={classes.card}>
                  <CardContent>
                    <img src={postGRES} height='100%' width='100%' />

                    <Typography
                      className={classes.pos}
                      align='center'
                      color='textSecondary'
                    >
                      {props.name}
                    </Typography>
                  </CardContent>
                  <CardActions />
                </Card>
              </Grid>
            </Button>
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <img
                    src={mongoDB}
                    height='100%'
                    width='100%'
                    padding-top='20px'
                  />

                  <Typography
                    className={classes.pos}
                    align='center'
                    color='textSecondary'
                  >
                    {props.name}
                  </Typography>
                </CardContent>
                <CardActions />
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <img src={AWSDB} height='100%' width='100%' />

                  <Typography
                    className={classes.pos}
                    align='center'
                    color='textSecondary'
                  >
                    {props.name}
                  </Typography>
                </CardContent>
                <CardActions />
              </Card>
            </Grid>
            <Grid item>
              <Card className={classes.card}>
                <CardContent>
                  <img src={MYSQL} height='80%' width='85%' />

                  <Typography
                    className={classes.pos}
                    align='center'
                    color='textSecondary'
                  >
                    {props.name}
                  </Typography>
                </CardContent>
                <CardActions />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
