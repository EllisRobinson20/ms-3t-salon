import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import ProductDetail from '../components/subcomponents/ProductDetail'

const ProductPageTemplate = ({ data }) => {
  return (
    <Layout>
      <ProductDetail product={data.shopifyProduct} />
    </Layout>
  )
}

export default ProductPageTemplate

export const data = graphql`
  query ProductLayOutQuery($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      handle
      images {
        id
        src
        gatsbyImageData
      }
      title
      description
      descriptionHtml
      tags
      id
      shopifyId
      variants {
        sku
        title
        price
        id
      }
      legacyResourceId
    }
  }
`
