import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { makeStyles } from '@material-ui/core/styles'
import MainHeader from '../components/MainHeader'
import RatingsSection from '../components/RatingsSection'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
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
    <MainHeader/>
    <RatingsSection/>
    </Layout>
  )
}

export default IndexPage
