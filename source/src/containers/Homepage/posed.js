import posed from 'react-pose'
import theme from 'styles/theme'
import Styled from './styled'

const Posed = {}

Posed.Homepage = posed(Styled.Homepage)({
  animating: {
    y: 'calc((var(--windowHeight) * -1) + 400px)',
    transition: theme.rootTransition,
  },
  normal: { y: '0vh', transition: { duration: 0 } },
})

export default Posed
