import React, { useLayoutEffect } from 'react'
import ShopifyBuy from "@shopify/buy-button-js"





const ProductDetail = ({ product }) => {
    useLayoutEffect(() => {
        const client = ShopifyBuy.buildClient({
            domain: process.env.SHOPIFY_DOMAIN,
            storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
        })
        const ui = ShopifyBuy.UI.init(client)
        ui.createComponent("product", {
            id: product.legacyResourceId,
            node: document.getElementById("button")
        })
    })
    return (
        <div>
            <div id="button"></div>
        </div>
    )
}

export default ProductDetail