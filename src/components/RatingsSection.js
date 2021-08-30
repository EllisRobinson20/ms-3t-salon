import React from 'react'
import Rating from '@material-ui/lab/Rating';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { graphql, useStaticQuery } from 'gatsby'
import { Typography, Container, Divider } from '@material-ui/core'
import {useMediaQuery} from '@material-ui/core';
import CardCarousel from './subcomponents/CardCarousel';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2em'
    },
    container40: {
        width: '40vw'
    },
    container60: {
        width: '60vw'
    },
    container90: {
        width: '90vw'
    },
    rating: {
        marginTop: '1.5em'
    },
  }));

export default function RatingsSection() {
    const data = useStaticQuery(graphql`
    query ListReviewQuery {
        allReview {
        edges {
            node {
            id
            rating
            name
            comment
            }
        }
        }
    }
`)
const getRatingsAverage = () => {
    let rating = 0;
    if (data) {
        data.allReview.edges.forEach(dbEntry => {
            rating += dbEntry.node.rating
            console.log("total: "+rating)
            
        });
        rating = rating/data.allReview.edges.length
        console.log("total2: "+rating)
    }
    return rating;
}

const classes = useStyles();
const theme = useTheme();
const matchesSm = useMediaQuery(theme.breakpoints.down('xs'));
const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    return (
        <div className={classes.root}>
            <Container className={matchesSm ? classes.container90: matchesMd ? classes.container60 :  classes.container40}>
                <Typography variant="h3" > Customer Reviews</Typography>
                <Divider/>
                <Typography variant="h5"> Heres what my clients have to say</Typography>
                <Rating name="half-rating-read" defaultValue={getRatingsAverage()} precision={0.5} readOnly size="large" />
                <Container className={classes.rating}>
                <CardCarousel data={data.allReview.edges} type={"review"} />
                </Container>
            </Container>  
        </div>
    )
}
