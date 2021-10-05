import React, {useContext, useEffect} from "react"
import { graphql, Link} from 'gatsby'
import Layout from "../components/Layout"
import ProductListing from "../components/ProductListing"
import { Grid, IconButton } from '@material-ui/core';
import { NavigationContext } from "../context/NavigationContext";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



const ProductsPage = ({location, data }) => {
  const {setPageState} = useContext(NavigationContext);
  const {lastPage} = useContext(NavigationContext);
  useEffect(() => {
    
    setPageState(location.pathname);
    
  })
  
  return (
  <Layout>
    <Grid container justifyContent="flex-start" style={{padding: "2em"}}>
    <Link to={lastPage}><IconButton href="/" color="textSecondary" aria-label="upload picture" component="span">
      <ArrowBackIcon/>
    </IconButton>
    </Link>
    </Grid>
    
    <ProductListing/>
  </Layout>)
}

export default ProductsPage
