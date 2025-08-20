import posed from 'react-pose'
import theme from 'styles/theme'
import Styled from './styled'

const Posed = {}

Posed.CaseStudy = posed(Styled.CaseStudy)({
  animatingFromHome: {
    y: 'calc((var(--windowHeight) * -1) + 400px)',
    transition: theme.rootTransition,
  },
  animatingCs: {
    y: 'calc(var(--windowHeight) * -1)',
    transition: theme.rootTransition,
  },
  normal: { y: '0vh', transition: { duration: 0 } },
})

export function getPose({ next, isHome, openingFromHome, csTransitioning }) {
  if (isHome && openingFromHome) {
    return 'animatingFromHome'
  }
  if (!next && csTransitioning) {
    return 'animatingCs'
  }
  return 'normal'
}
export default Posed
