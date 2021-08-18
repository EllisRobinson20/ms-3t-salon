import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Timeline from "../../images/assets/timeline.svg";
import CallIcon from '@material-ui/icons/Call';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <div>
        <Grid container spacing={1}>
            <Grid item xs={1}>
                <Timeline/> 
            </Grid>
            <Grid item xs={2}>
            <Typography variant="caption">
                    09:00
                </Typography>
            </Grid>
            <Grid item xs={9}>
            <Card className={classes.root}>
                <CardContent >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Name: Trish
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2">
                            Weave
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p">
                            Start: 09:00
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" component="p">
                            Finish: 11:30
                            </Typography>
                        </Grid>
                        
                    </Grid>
                    
                    
                    
                    
                </CardContent>
                <CardActions>
                    <Grid container spacing={0}>
                        <Grid item xs={2} >
                        <CallIcon />
                        </Grid>
                        <Grid item xs={10}>
                            <Typography color="textSecondary">
                            0781234567 
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
            </Grid>
        </Grid>
        
    </div>
    
    
  );
}
