import React from 'react'
import Img from "gatsby-image"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Product = ({product}) => {
    return (
        <article>
            <Link to={`/shop/${product.handle}`}>
                <h3>{product.title}</h3>
            </Link>
            <GatsbyImage
      image={product.featuredImage.gatsbyImageData}
      alt={product.featuredImage.altText}
    />
            <h3>${product.priceRangeV2.maxVariantPrice.amount}</h3>

        </article>
    )
}

export default Product