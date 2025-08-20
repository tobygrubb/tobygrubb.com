import React, { useContext, useState } from 'react'
import { ThemeProvider } from 'styled-components/macro'
import Nav from 'components/Nav/Nav'
import MobileMenu from 'components/MobileMenu/MobileMenu'
import SecondaryNav from 'components/SecondaryNav/SecondaryNav'
import WorkFilter from 'components/WorkFilter/WorkFilter'
// import Work from 'components/Work/Work'
import Head from 'components/Head'
import View from 'components/View/View'
import About from 'containers/About/About'
// import Shop from 'containers/Shop/Shop'
import Root from 'containers/Root/Root'
import CursorDotProvider from 'components/CursorDot/CursorDotProvider'
import theme from 'styles/theme'
import GlobalStyle from 'styles/GlobalStyle'
import useWindowSize from 'hooks/useWindowSize'
import useRouterData from './useRouterData'
import useNavInvert from './useNavInvert'
import useProjectLaunch from './useProjectLaunch'
import { CSSTransition } from 'react-transition-group'

/**
 * Types
 */

interface ILayoutProps {
  view: string
  pathUid: string
}

interface ContextProps {
  csState: {
    caseStudySelected: boolean
    currentUid: string | null
  }
  mobileMenu: boolean,
  filters: object,
  setFilters: any,
  setMobileMenu: any,
  view: string
  launchProject: () => void
  navInverted: boolean
  invertNav: () => void
  revertNav: () => void
}

/**
 * Component
 */

export const LayoutContext = React.createContext<ContextProps>({
  csState: {
    caseStudySelected: false,
    currentUid: null,
  },
  view: '',
  mobileMenu: true,
  filters: {active: false, tag: 'all'},
  setFilters: () => null,
  setMobileMenu: () => null,
  launchProject: () => null,
  navInverted: true,
  invertNav: () => null,
  revertNav: () => null,
})

const Layout: React.FC<ILayoutProps> = ({ view, pathUid }) => {
const csState = useRouterData({ pathUid })

  const [filters, setFilters] = useState({
    active: false,
    tag: 'all'
  })
  const [mobileMenu, setMobileMenu] = useState(false)
  const { revertNav, invertNav, navInverted } = useNavInvert()
  const { launchProject, projectLaunchStatus } = useProjectLaunch({
    currentUid: csState.currentUid,
  })

  document.documentElement.style.setProperty(
    '--windowHeight',
    `${useWindowSize().height}px`
  )

  return (
    <CursorDotProvider>
      <ThemeProvider theme={theme}>
        <LayoutContext.Provider
          value={{
            ...{ view },
            ...{ csState: { ...csState } },
            filters, 
            setFilters,
            mobileMenu,
            setMobileMenu,
            launchProject,
            navInverted,
            invertNav,
            revertNav,
          }}
        >
          <GlobalStyle />
          <AppMeta />
          <CSSTransition in={filters.active} timeout={400} classNames="fade-slide-filters" mountOnEnter unmountOnExit>
            <WorkFilter />
          </CSSTransition>
          <CSSTransition in={mobileMenu} timeout={400} classNames="fade-slide-mobile" mountOnEnter unmountOnExit>
            <MobileMenu />
          </CSSTransition>
          <Nav />
          <SecondaryNav />
          <main className={`views -view-is-${view}`}>
            <View aside viewName="about" view={view} filterActive={filters.active}>
              <About />
            </View>
            <View viewName="root" view={view} filterActive={filters.active}>
              <Root {...{ projectLaunchStatus }} />
            </View>
          </main>
        </LayoutContext.Provider>
      </ThemeProvider>
    </CursorDotProvider>
  )
}

function AppMeta() {
  const { view } = useContext(LayoutContext)
  if (view === 'about') {
    return <Head title="About" path="/about" />
  }
  if (view === 'shop') {
    return <Head title="Shop" path="/shop" />
  }
  return <Head path="/" />
}

export default Layout
