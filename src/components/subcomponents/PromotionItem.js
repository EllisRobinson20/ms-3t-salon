import { Card } from '@material-ui/core'
import React from 'react'
import SalesPromotion from '../subcomponents/SalesPromotion'
import BlogPromotion from '../subcomponents/BlogPromotion'

export default function PromotionItem({ index, data }) {
  return (
    <div>
      {
        <Card elevation={2}>
          {index < 2 ? (
            <SalesPromotion
              index={index}
              data={data.allShopifyProduct.edges[index].node}
            />
          ) : (
            <BlogPromotion />
          )}
        </Card>
      }
    </div>
  )
}
