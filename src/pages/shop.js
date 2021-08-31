import React from "react"
import { graphql, Link} from 'gatsby'
import Layout from "../components/Layout"
import ProductListing from "../components/ProductListing"
import { Grid, IconButton } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';



const ProductsPage = ({ data }) => (
  <Layout>
    <Grid item container justifyContent="flex-start" style={{padding: "2em"}}>
    <Link to="/"><IconButton href="/" color="textSecondary" aria-label="upload picture" component="span">
      <ArrowBackIcon/>
    </IconButton>
    </Link>
    </Grid>
    
    <ProductListing/>
  </Layout>
)

export default ProductsPage
