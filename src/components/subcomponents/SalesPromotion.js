import React from 'react';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { GatsbyImage } from "gatsby-plugin-image";
import {ThemeProvider, createTheme } from '@material-ui/core/styles';

const buttonTheme = createTheme({
  palette: {primary: { main: '#d52349' }}
})

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function SalesPromotion({data}) {
  const classes = useStyles();

  return (
    <>
      <CardContent>
          <Typography color="textPrimary" gutterBottom variant="h5" component="h2">
            {data.productType}
          </Typography>
        </CardContent>
        <GatsbyImage
        className={classes.media}
      image={data.featuredImage.gatsbyImageData}
      alt={data.featuredImage.altText}
    />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This is placeholder text. replace this with your own product descriptions
          </Typography>
        </CardContent>
      <CardActions>
        <ThemeProvider theme={buttonTheme}>
        <Button href={`/shop/${data.handle}`} size="small" color="primary" variant="contained">
          Buy
        </Button>
        </ThemeProvider>
      </CardActions>
    </>
  );
}
