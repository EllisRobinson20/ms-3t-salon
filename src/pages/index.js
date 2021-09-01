import React, {useContext} from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { makeStyles } from '@material-ui/core/styles'
import MainHeader from '../components/MainHeader'
import RatingsSection from '../components/RatingsSection'
import SectionGallery from '../components/SectionGallery'
import SectionPriceList from '../components/SectionPriceList'
import { Grid } from '@material-ui/core'
import SectionPromotion from '../components/SectionPromotion'
import { NavigationContext } from "../context/NavigationContext";


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '1em',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  borders: {
    backgroundColor: '#e4dcc5'
  }
}));

const IndexPage = ({location}) => {
  const {setPageState} = useContext(NavigationContext);
  setPageState(location.pathname);
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <MainHeader/>
        </Grid>
        <Grid item  xs={0}>
        </Grid>
        <Grid item  xs={12}>
        <RatingsSection/>
        <SectionGallery/>
        </Grid>
        <Grid item  xs={0}>

        </Grid>
        <Grid item md={12} xs={0}>
        <SectionPriceList/>
        </Grid>
        <Grid item md={12} xs={0}>
        <SectionPromotion/>
        </Grid>
        
      </Grid>
   
    </Layout>
  )
}

export default IndexPage
