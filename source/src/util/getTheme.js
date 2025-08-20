import { css } from 'styled-components/macro'

const getTheme = key => css(props => props.theme[key])

export default getTheme
