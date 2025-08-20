import React from 'react'
import styled from 'styled-components/macro'
import { About } from 'containers/About/styles'

const Clients = ({ imageUrls, title }) => (
  <About.FullHeightWrapper>
    <About.SectionTitle>{title}</About.SectionTitle>
    <About.ColumnWrapper>
      <Logos imageUrls={imageUrls} />
    </About.ColumnWrapper>
  </About.FullHeightWrapper>
)

const Logos = ({ imageUrls }) =>
  imageUrls.map(img => (
    <About.Column key={img}>
      <Image src={img} alt="This Design | Portland, OR" />
    </About.Column>
  ))

const Image = styled.img`
  margin: 0px auto;
  width: 50% !important;
`

export default Clients
