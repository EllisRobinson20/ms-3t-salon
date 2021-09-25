import { Grid } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useState } from 'react'
import PromotionItem from './subcomponents/PromotionItem'


export default function SectionPromotion() {
    const data = useStaticQuery(graphql`
    query AllPromotionComponentQuery {
        allShopifyProduct(limit: 2, sort: {order: DESC, fields: createdAt}) {
          edges {
            node {
              id
              featuredImage {
                gatsbyImageData(height: 180)
                altText
              }
              handle
              productType
            }
          }
        }
      }
    `)
    const [maxItems, setMaxItems] = useState(2)
    const colSpan = () => {
        return 12/maxItems
    }
    const count = () => {
        const arr = []
        for (var i = 0; i < maxItems; i++) {
            arr.push(i)
        }
        return arr
        
    }
    return (
        <div>
            <Grid container spacing={4} style={{marginBottom: "2em", padding: "2em"}}>
                {count().map((item, index) => (
                    <Grid item sm={12/maxItems}>
                        {/* {console.log(index)} */}
                        <PromotionItem index={index} data={data} count={count()}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
