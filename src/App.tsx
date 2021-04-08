import React, { Fragment } from 'react'
import { Layout, PolygonBackground, CompanyTitle } from 'components'
import { Content, DashboardMenu } from 'containers'
import { Router } from '@reach/router'
import { BASE_PATH } from 'utils'

export const App = () => {
  return (
    <>
      <Layout>
        <DashboardMenu />
        <Router
          primary={false}
          component={Fragment}
          basepath={BASE_PATH}
        >
          <PolygonBackground path="/" />
          <Content path="/project/:projectId/" />
        </Router>
      </Layout>
      <CompanyTitle />
    </>
  )
}
