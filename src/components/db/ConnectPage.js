import React from "react";
import { DisplayCard } from "../../index";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  },
  card: {
    // minWidth: 275
    height: 150,
    width: 1000
  },
  pos: {
    marginBottom: 0
  }
}));

const ConnectPage = props => {
  const [spacing] = React.useState(2);
  const classes = useStyles();

  return (
    <div>
      <h1>Connect:</h1>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12}>
          <Grid container justify='space-between' spacing={spacing}>
            <Card className={classes.card}>
              <CardContent>
                <Typography
                  className={classes.pos}
                  align='left'
                  color='textPrimary'
                >
                  Localhost
                </Typography>
                <Button
                  onClick={() =>
                    props.type === "db"
                      ? props.history.push(tablesPath)
                      : props.history.push("/edit")
                  }
                  size='large'
                >
                  Edit
                </Button>
              </CardContent>
              <CardActions />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ConnectPage;
