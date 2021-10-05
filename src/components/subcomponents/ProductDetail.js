import React, { useLayoutEffect, useContext } from 'react'
import ShopifyBuy from '@shopify/buy-button-js'
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from 'gatsby'
import { NavigationContext } from '../../context/NavigationContext'

const ProductDetail = ({ product }) => {
  // context
  const { lastPage } = useContext(NavigationContext)
  // side effects
  useLayoutEffect(() => {
    const client = ShopifyBuy.buildClient({
      domain: process.env.GATSBY_SHOPIFY_DOMAIN,
      storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
    })
    const ui = ShopifyBuy.UI.init(client)
    ui.createComponent('product', {
      id: product.legacyResourceId,
      node: document.getElementById('button'),
      options: {
        product: {
          styles: {
            product: {
              '@media (min-width: 601px)': {
                'max-width': '100%',
                'margin-left': '0',
                'margin-bottom': '50px',
              },
              'text-align': 'left',
            },
            title: {
              'font-family': 'Roboto, sans-serif',
              'font-weight': 'normal',
              'font-size': '26px',
            },
            button: {
              'font-family': 'Roboto, sans-serif',
              ':hover': {
                'background-color': '#c02042',
              },
              'background-color': '#d52349',
              ':focus': {
                'background-color': '#c02042',
              },
            },
            price: {
              'font-family': 'Roboto, sans-serif',
              'font-size': '18px',
            },
            compareAt: {
              'font-family': 'Roboto, sans-serif',
              'font-size': '15.299999999999999px',
            },
            unitPrice: {
              'font-family': 'Roboto, sans-serif',
              'font-size': '15.299999999999999px',
            },
            description: {
              'font-family': 'Roboto, sans-serif',
            },
          },
          layout: 'horizontal',
          contents: {
            img: false,
            imgWithCarousel: true,
            button: false,
            buttonWithQuantity: true,
            description: true,
          },
          width: '100%',
          text: {
            button: 'Add to cart',
          },
          googleFonts: ['Roboto'],
        },
        productSet: {
          styles: {
            products: {
              '@media (min-width: 601px)': {
                'margin-left': '-20px',
              },
            },
          },
        },
        modalProduct: {
          contents: {
            img: false,
            imgWithCarousel: true,
            button: false,
            buttonWithQuantity: true,
          },
          styles: {
            product: {
              '@media (min-width: 601px)': {
                'max-width': '100%',
                'margin-left': '0px',
                'margin-bottom': '0px',
              },
            },
            button: {
              'font-family': 'Roboto, sans-serif',
              ':hover': {
                'background-color': '#c02042',
              },
              'background-color': '#d52349',
              ':focus': {
                'background-color': '#c02042',
              },
            },
            title: {
              'font-family': 'Helvetica Neue, sans-serif',
              'font-weight': 'bold',
              'font-size': '26px',
              color: '#4c4c4c',
            },
            price: {
              'font-family': 'Helvetica Neue, sans-serif',
              'font-weight': 'normal',
              'font-size': '18px',
              color: '#4c4c4c',
            },
            compareAt: {
              'font-family': 'Helvetica Neue, sans-serif',
              'font-weight': 'normal',
              'font-size': '15.299999999999999px',
              color: '#4c4c4c',
            },
            unitPrice: {
              'font-family': 'Helvetica Neue, sans-serif',
              'font-weight': 'normal',
              'font-size': '15.299999999999999px',
              color: '#4c4c4c',
            },
            description: {
              'font-family': 'Helvetica Neue, sans-serif',
              'font-weight': 'normal',
              'font-size': '14px',
              color: '#4c4c4c',
            },
          },
          googleFonts: ['Roboto'],
          text: {
            button: 'Add to cart',
          },
        },
        option: {
          styles: {
            label: {
              'font-family': 'Roboto, sans-serif',
            },
            select: {
              'font-family': 'Roboto, sans-serif',
            },
          },
          googleFonts: ['Roboto'],
        },
        cart: {
          styles: {
            button: {
              'font-family': 'Roboto, sans-serif',
              ':hover': {
                'background-color': '#c02042',
              },
              'background-color': '#d52349',
              ':focus': {
                'background-color': '#c02042',
              },
            },
          },
          text: {
            total: 'Subtotal',
            button: 'Checkout',
          },
          googleFonts: ['Roboto'],
        },
        toggle: {
          styles: {
            toggle: {
              'font-family': 'Roboto, sans-serif',
              'background-color': '#d52349',
              ':hover': {
                'background-color': '#c02042',
              },
              ':focus': {
                'background-color': '#c02042',
              },
            },
          },
          googleFonts: ['Roboto'],
        },
      },
    })
  })
  return (
    <div>
      <script src="http://sdks.shopifycdn.com/buy-button/2.1.7/buybutton.js"></script>
      <Link to={lastPage}>
        <IconButton
          href="/"
          color="textSecondary"
          aria-label="upload picture"
          component="span"
        >
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <div id="button"></div>
    </div>
  )
}

export default ProductDetail
