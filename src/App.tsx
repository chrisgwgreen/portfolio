import React, { Fragment } from 'react'
import { Layout, PolygonBackground } from 'components'
import { Content } from 'containers'
import { Router } from '@reach/router'

function App() {
  return (
    <Layout>
      <Router primary={false} component={Fragment}>
        <PolygonBackground path="/" />
        <Content path="/project/:projectId/" />
      </Router>
    </Layout>
  )
}

export default App
