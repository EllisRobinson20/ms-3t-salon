import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { makeStyles } from '@material-ui/core/styles'
import MainHeader from '../components/MainHeader'
import RatingsSection from '../components/RatingsSection'
import SectionGallery from '../components/SectionGallery'
import { Grid } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  borders: {
    backgroundColor: 'e4dcc5'
  }
}));

const IndexPage = () => {

  const classes = useStyles()
  const [features, setFeatures] = React.useState(true)
  const [info, setInfo] = React.useState(true)

  function handleClick(id) {
    switch(id) {
      case "features":
        setFeatures(!features)
        break;
      case "info":
        setInfo(!info)
        break
    }
  }

  return(
    <Layout>
      <SEO title="Home" />
      <Grid container spacing={0}>
        <Grid item xs={12}>
        <MainHeader/>
        </Grid>
        <Grid item md={1} xs={0}>
        </Grid>
        <Grid item md={10} xs={12}>
        <RatingsSection/>
        <SectionGallery/>
        </Grid>
        <Grid item md={1} xs={0}>

        </Grid>
      </Grid>
   
    </Layout>
  )
}

export default IndexPage
