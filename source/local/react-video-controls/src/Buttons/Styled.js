import styled from 'styled-components'

const Button = styled.button`
  display: block;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  text-align: left;

  background: transparent;

  /* inherit font & color from ancestor */
  color: inherit;
  font: inherit;

  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  -webkit-appearance: none;
`

export default { Button }
