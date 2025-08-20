import 'styles/reset.scss'
import 'styles/fonts.scss'
import 'styles/typography.scss'
import 'styles/layout.scss'

import React, { createContext } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Loading from 'components/Loading/Loading'
import Router from '../Router/Router'
import useApi from './useApi'
import './App.scss'

export const ApiDataCtx = createContext()

function DataFetch({ context }) {
  const data = useApi({ context })
  if (data) {
    return (
      <ApiDataCtx.Provider value={data}>
        <Router />
      </ApiDataCtx.Provider>
    )
  }
  return <Loading />
}

function App() {
  return (
    <BrowserRouter>
      <Route
        path={['/@:context', '/']}
        render={({ match }) => {
          return <DataFetch context={match.params.context} />
        }}
      />
    </BrowserRouter>
  )
}
export default React.memo(App)
