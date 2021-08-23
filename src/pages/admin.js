import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'

import Diary from '../components/Diary'

export default function admin() {
    return (
        <div>
            <Layout>
                <SEO title="Admin" />
                <Diary/>
            </Layout>
        </div>
    )
}
