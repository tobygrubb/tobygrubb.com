import styled from 'styled-components'

const Range = styled.input`
  background: blue;
  width: 100%;
  appearance: none;
  outline: none;
  height: 10px;

  &::-webkit-slider-thumb {
    opacity: 0.5;
    height: 100%;
  }
`

const Bar = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
  overflow: hidden;
  cursor: pointer;
`

const Progress = styled.div.attrs(props => ({
  style: {
    width: `${props.percent * 100}%`,
  },
}))`
  background: black;
  height: 10px;
  width: 100%;

  ${'' /* transition: ${props => (!props.dragging ? '250ms transform linear' : '0ms')}; */}
`
export default { Range, Bar, Progress }
