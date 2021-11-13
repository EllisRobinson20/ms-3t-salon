import React, {useContext, useEffect} from "react"
import { graphql, Link} from 'gatsby'
import Layout from "../components/Layout"
import ProductListing from "../components/ProductListing"
import { Grid, IconButton } from '@material-ui/core';
import { NavigationContext } from "../context/NavigationContext";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SEO from "../components/seo";



const ProductsPage = ({location, data }) => {
  const {setPageState} = useContext(NavigationContext);
  const {lastPage} = useContext(NavigationContext);
  useEffect(() => {
    
    setPageState(location.pathname);
    
  })
  
  return (
  <Layout>
    <SEO title="Buy hair products from us here"/> 
    <Grid container justifyContent="flex-start" style={{padding: "2em 0", maxWidth: "55vw", margin: "0 auto"}}>
    <Link to={lastPage}>
      <IconButton href="/" color="textSecondary" aria-label="upload picture" component="span">
       <ArrowBackIcon/>
    </IconButton>
    </Link>
    <h1 style={{color: '#5d5d5d'}}>Product search</h1>
    </Grid>
    
    <ProductListing/>
  </Layout>)
}

export default ProductsPage
