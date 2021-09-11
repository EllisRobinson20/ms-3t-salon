import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Product from "./subcomponents/Product"


/* const PRODUCTS_LISTING_QUERY = graphql`
    query ProductsListingQuery {
        allShopifyProduct {
            edges {
              node {
                title
                shopifyId
                description
                priceRangeV2 {
                  maxVariantPrice {
                    amount
                  }
                  minVariantPrice {
                    amount
                  }
                }
                status
                featuredImage {
                    altText
                    gatsbyImageData
                    id
                  }
                seo {
                  description
                }
                totalInventory
                legacyResourceId
                options {
                  name
                  values
                  id
                }
                id
                handle
              }
            }
          }
    }
` */

const ProductListing = () => {
    /* const { allShopifyProduct } = useStaticQuery(PRODUCTS_LISTING_QUERY) */
    return (
        <div>
            {
               /*  allShopifyProduct.edges.map(edge => {
                    return <Product key={edge.node.id} product={edge.node} /> 
                }) */
            }
        </div>
    )
}

export default ProductListing