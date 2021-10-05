import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Rating from '@material-ui/lab/Rating'

// Use generic component to render carousel items
// add a prop of type to call any new layouts
// add a prop of item, an object holding values

function CarouselItem(props) {
  if (props.type === 'review') {
    return (
      <>
        <h2>{props.item.name}</h2>
        <p>{props.item.feedback}</p>
        <Rating
          style={{ margin: '5px auto' }}
          name="service-rating"
          defaultValue={props.item.rating}
          precision={1}
          readOnly
          size="small"
        />
      </>
    )
  } else if (props.type === 'gallery') {
    return (
      <div
        style={
          window.innerWidth < 600 ? { height: '65vh' } : { height: '75vh' }
        }
      >
        <img
          src={props.item.image}
          style={
            window.innerWidth < 600
              ? { maxWidth: '90vw', borderRadius: '8px' }
              : { maxHeight: '75vh', borderRadius: '8px' }
          }
        />
      </div>
    )
  }
}
export default function CardCarousel(props) {
  var items = props.data.map(item => {
    if (props.type === 'review') {
      return {
        name: item.node.name,
        feedback: item.node.comment,
        rating: item.node.rating,
      }
    } else if (props.type === 'gallery') {
      return { image: item.node.secure_url }
    }
  })
  return (
    <>
      <Carousel>
        {items.map((item, i) => (
          <CarouselItem key={i} item={item} type={props.type} />
        ))}
      </Carousel>
    </>
  )
}
