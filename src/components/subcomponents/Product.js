import React from 'react'
import Img from "gatsby-image"
import { Link } from "gatsby"

const Product = ({product}) => {
    return (
        <article>
            <Link to={`/shop/${product.handle}`}>
                <h3>{product.title}</h3>
            </Link>
            <Img key={product.id} fixed={product.images.src}/>
            <h3>${product.priceRangeV2.maxVariantPrice.amount}</h3>

        </article>
    )
}

export default Product