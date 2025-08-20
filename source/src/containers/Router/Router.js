import React, { useContext } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  matchPath,
} from 'react-router-dom'
import { ApiDataCtx } from '../App/App'
import Layout from '../Layout/Layout'
import Preview from './Preview'

function Router() {
  const { caseStudies } = useContext(ApiDataCtx)
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path={caseStudies.map(cs => `/work/${cs.uid}`)}
          render={({ match }) => (
            <Layout
              view="root"
              isWorkView
              pathUid={matchPath(match.url, { path: '/work/:uid' }).params.uid}
            />
          )}
        />
        {/* <Route exact path="/shop/" render={() => <Layout view="shop" />} /> */}
        <Route exact path="/about/" render={() => <Layout view="about" />} />
        <Route
          exact
          path="/preview/"
          render={routeProps => <Preview {...routeProps} />}
        />
        <Route path="/" render={() => <Layout view="root" isHome />} />
      </Switch>
    </BrowserRouter>
  )
}

export default React.memo(Router)
