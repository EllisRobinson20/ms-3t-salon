import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Card } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '55vw',
    padding: '2em',
    margin: '0 auto 4em',
  },
  imageContainer: {
    maxWidth: '60%',
    margin: '0 auto 1em',
  },
  buttonText: {
    backgroundColor: '#d52349',
  },
}))

const Product = ({ product }) => {
  // styles
  const classes = useStyles()
  return (
    <article>
      <Card className={classes.root} variant="outlined">
        <Link to={`/shop/${product.handle}`}>
          <h3>{product.title}</h3>
        </Link>
        <Card
          elevation={1}
          className={classes.imageContainer}
          variant="elevated"
        >
          <GatsbyImage
            image={product.featuredImage.gatsbyImageData}
            alt={product.featuredImage.altText}
          />
        </Card>
        <h3>${product.priceRangeV2.maxVariantPrice.amount}</h3>
        <Button
          className={classes.buttonText}
          href={`/shop/${product.handle}`}
          variant="contained"
          color="secondary"
          size="large"
        >
          More
        </Button>
      </Card>
    </article>
  )
}

export default Product
