import React, { Fragment } from 'react'
import { Layout, PolygonBackground, CompanyTitle } from 'components'
import { Content, DashboardMenu } from 'containers'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <DashboardMenu />

          <Switch>
            <Route path="/project/:projectId/">
              <Content />
            </Route>
            <Route path="/">
              <PolygonBackground />
            </Route>
          </Switch>
        </Layout>
        <CompanyTitle />
      </Router>
    </>
  )
}
