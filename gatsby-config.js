require('dotenv').config();
module.exports = {
  siteMetadata: {
    title: `Gatsby Material UI Starter`,
    description: `Kick off your next, great Gatsby project with this Material UI starter. This barebones starter ships with the main Gatsby and Material UI configuration files you might need.`,
    author: `@dominicabela`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,

          projectId: process.env.FIREBASE_PROJECT_ID,
          
          messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID
        }
      }
    },
    {
      resolve: `gatsby-source-firestores`,
      options: {
        bases: [
          {
            name: 'ms-3t-salon',
            credential: require('./firebase-creds.json'),
            types: [
              {
                type:  'Service',
                collection: 'services',
                map: doc => ({
                  bookingCount: doc.bookingCount,
                  consultationOnly: doc.consultationOnly,
                  description: doc.description,
                  durationMinutes: doc.durationMinutes,
                  name: doc.name,
                  pricePence: doc.pricePence,
                  upperPriceLimit: doc.upperPriceLimit,
                  variablePrice: doc.variablePrice
                })
              },
            {
              type:  'Review',
              collection: 'reviews',
              map: doc => ({
                comment: doc.comment,
                name: doc.name,
                rating: doc.starRating
              })
            }
            ]
          }
        ],
        
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        prefix: `salon/`, 
        maxResults: `100`,
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      // If you want to use styled components, in conjunction to Material-UI, you should:
      // - Change the injection order
      // - Add the plugin
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
      // 'gatsby-plugin-styled-components',
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    
  ],
}
