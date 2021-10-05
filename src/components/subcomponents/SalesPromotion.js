import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

const buttonTheme = createTheme({
  palette: { primary: { main: '#d52349' } },
})

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
})

export default function SalesPromotion({ data }) {
  // styles
  const classes = useStyles()

  return (
    <>
      <CardContent>
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
          component="h2"
        >
          {data.productType}
        </Typography>
      </CardContent>
      <GatsbyImage
        className={classes.media}
        image={data.featuredImage.gatsbyImageData}
        alt={data.featuredImage.altText}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This is placeholder text. replace this with your own product
          descriptions
        </Typography>
      </CardContent>
      <CardActions>
        <Container style={{ textAlign: 'center' }}>
          <ThemeProvider theme={buttonTheme}>
            <Button
              href={`/shop/${data.handle}`}
              size="large"
              color="primary"
              variant="contained"
            >
              Buy
            </Button>
          </ThemeProvider>
        </Container>
      </CardActions>
    </>
  )
}
