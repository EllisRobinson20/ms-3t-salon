/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Query for all products in Shopify
  const result = await graphql(`
    query {
      allShopifyProduct {
        edges {
            node {
                id
                handle
            }
        }
    }
    }
  `)
  // Iterate over all products and create a new page using a template
  // The product "handle" is generated automatically by Shopify
  result.data.allShopifyProduct.edges.forEach((edge) => {
    createPage({
      path: `/shop/${edge.node.handle}`,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        id: edge.node.id,
        handle: edge.node.handle,
        product: edge,
      },
    })
  })
}