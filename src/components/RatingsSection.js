import React, {useEffect, useState} from 'react'
import Rating from '@material-ui/lab/Rating';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { graphql, useStaticQuery } from 'gatsby'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Typography, Container, Divider } from '@material-ui/core'
import {useMediaQuery} from '@material-ui/core';

function CardCarousel(props)
{
    var items = props.data.map((item) => {
            return {name: item.node.name, feedback: item.node.comment, rating: item.node.rating}
    })
    
    return (
        <Carousel>
            {
                items.map( (item, i) => <CarouselItem key={i} item={item} /> )
            }
        </Carousel>
    )
}

function CarouselItem(props)
{
    return (
        <Paper elevation={4} style={{margin: '0 auto',padding: '5px auto'}}>
            <h2>{props.item.name}</h2>
            <p>{props.item.feedback}</p>
            <Rating style={{margin: '5px auto'}} name="half-rating-read" defaultValue={props.item.rating} precision={1} readOnly size="small" />
        </Paper>
    )
}

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
  }));


export default function RatingsSection() {
    const data = useStaticQuery(graphql`
    query ListServicesQuery {
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
const [ratings, setRatings] = useState()
useEffect(() => {
    setRatings(getRatingsAverage())
})

    const classes = useStyles();

    const theme = useTheme();
const matchesSm = useMediaQuery(theme.breakpoints.down('xs'));
const matchesMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
const [currentWidth, setCurrentWidth] = useState()
useEffect(() => {
    
})
    return (
        <div className={classes.root}>
            
            <Container className={matchesSm ? classes.container90: matchesMd ? classes.container60 :  classes.container40}>
                <Typography variant="h3" > Customer Reviews</Typography>
                <Divider/>
                <Typography variant="h5"> Heres what my clients have to say</Typography>
            
                <Rating name="half-rating-read" defaultValue={getRatingsAverage()} precision={0.5} readOnly size="large" />
                <CardCarousel data={data.allReview.edges} />
            </Container>  
        </div>
    )
}
