import styled from 'styled-components/macro'

const Wrapper = styled.div`
  background-color: black;
  color: ${props => props.theme.color.textLt};

  h1,
  h2,
  h4,
  h5,
  h6,
  strong {
    color: ${props => props.theme.color.white};
  }

  a {
    color: ${props => props.theme.color.textLt};
    text-decoration: none;
  }

  .about__h3 {
    padding-bottom: 60px;
    text-align: center;
  }
`

export default { Wrapper }
