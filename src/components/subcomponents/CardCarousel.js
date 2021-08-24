import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
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
export default function CardCarousel(props) {
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
