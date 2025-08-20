import styled from 'styled-components/macro'
import React from 'react'

export const About = {}

About.SectionTitle = styled.h3`
  padding-bottom: 60px;
  text-align: center;
`

const BORDERS = false

About.Wrapper = styled.div`
  margin: 0px auto;
  padding: 2rem;
  border: ${BORDERS ? '1px solid orange' : 'none'};
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 1500px;
    width: 100%;
  }
`

About.FullHeight = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10vh 0;
  box-sizing: border-box;

  border: ${BORDERS ? '1px solid red' : 'none'};
`

About.FullHeightWrapper = ({ children, large }) => (
  <About.FullHeight>
    <About.Wrapper large={large}>{children}</About.Wrapper>
  </About.FullHeight>
)

About.ColumnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2rem;
  border: ${BORDERS ? '1px solid green' : 'none'};
`

About.Column = styled.div`
  width: ${({ fullMobile }) => (fullMobile ? '100%' : '50%')};
  @media (min-width: 768px) {
    width: ${({ items }) => {
      switch (items) {
        case 2:
          return '50%'
        case 3:
          return '33.3%'
        case 4:
          return '25%'
        default:
          return '33.3%'
      }
    }};
  }
  padding: 0 2rem;
  box-sizing: border-box;
  border: ${BORDERS ? '1px solid blue' : 'none'};

  img {
    width: 100%;
  }
`

export default null
