import React, { Fragment } from 'react'
import { Layout, PolygonBackground, CompanyTitle } from 'components'
import { Content, DashboardMenu } from 'containers'
import {
  Router,
  LocationProvider,
  createHistory,
  HistorySource
} from '@reach/router'

import createHashSource from 'hash-source'

const source = createHashSource()

const history = createHistory(source as HistorySource)

export const App = () => {
  return (
    <>
      <LocationProvider history={history}>
        <Layout>
          <DashboardMenu />
          <Router primary={false} component={Fragment}>
            <PolygonBackground path="/" />
            <Content path="/project/:projectId/" />
          </Router>
        </Layout>
        <CompanyTitle />
      </LocationProvider>
    </>
  )
}
