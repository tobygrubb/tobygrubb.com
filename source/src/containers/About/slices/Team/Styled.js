import styled from 'styled-components/macro'
import { mq } from 'styles/theme'

const THREE_COL_BREAKPOINT = mq.md
const TWO_COL_BREAKPOINT = mq.sm
const ASPECT = 66.67

const Img = styled.img`
  width: 100%;
  display: block;
  margin-bottom: 2rem;

  @media ${TWO_COL_BREAKPOINT} {
    display: none;
  }
`

const Wrapper = styled.div`
  display: grid;
  width: 100%;

  @media ${TWO_COL_BREAKPOINT} {
    grid-template-columns: repeat(2, 1fr);
    margin: -0.5em;
  }
  @media ${THREE_COL_BREAKPOINT} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Item = styled.div`
  @media ${TWO_COL_BREAKPOINT} {
    background-image: url(${props => props.portrait});
    background-size: cover;
    background-position: 50% 50%;
    padding-top: ${ASPECT * 2}%;
    position: relative;
    height: 0;
    margin: 0.5em;
  }
  @media ${THREE_COL_BREAKPOINT} {
    background-image: url(${props =>
      props.theme.large ? props.landscape : props.portrait});

    padding-top: ${props => (props.theme.large ? ASPECT : ASPECT * 2)}%;
    grid-column: ${props => props.theme.large && 'auto / span 2'};
  }

  img {
    width: 100%;
  }
`

const Overlay = styled.div`
  cursor: pointer;

  @media ${TWO_COL_BREAKPOINT} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.75);
    padding: 2rem;

    box-sizing: border-box;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    opacity: 0;

    &:hover {
      opacity: 1;
    }

    transition: 300ms opacity ${props => props.theme.ease.standard};
  }
`

const TextWrap = styled.div`
  @media ${TWO_COL_BREAKPOINT} {
    transform: translate3d(0, 0.5em, 0);

    ${Overlay}:hover & {
      transform: translate3d(0, 0, 0);
    }

    transition: 300ms transform ${props => props.theme.ease.standard};
  }
  @media ${THREE_COL_BREAKPOINT} {
    width: ${props => (props.theme.large ? 50 : 100)}%;
  }
`

export default { Wrapper, Item, Overlay, TextWrap, Img }
