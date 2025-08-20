import React from 'react'
import { RichText } from 'prismic-reactjs'
import { ThemeProvider } from 'styled-components'
import { About } from 'containers/About/styles'
import Styled from './Styled'

// import PropTypes from 'prop-types'
/* eslint react/prop-types: 0 */

function Team({ items }) {
  return (
    <About.Wrapper>
      <Styled.Wrapper>
        {items.map((item, i) => {
          const large =
            /* every 4th image starting at first img */
            i % 4 === 0 ||
            /* every 4th image starting at second img */
            (i + 1) % 4 === 0

          return (
            <ThemeProvider theme={{ large }} key={item.role}>
              <Styled.Item
                landscape={item.image.url}
                portrait={item.image.portrait.url}
              >
                <Styled.Img src={item.image.mobile.url} />
                <Styled.Overlay>
                  <Styled.TextWrap>
                    <h2>{RichText.asText(item.name)}</h2>
                    <h3>{item.role}</h3>
                    {RichText.render(item.description)}
                  </Styled.TextWrap>
                </Styled.Overlay>
              </Styled.Item>
            </ThemeProvider>
          )
        })}
      </Styled.Wrapper>
    </About.Wrapper>
  )
}

Team.Wrapper = ({ data }) => {
  return <Team items={data.items} />
}

// Team.propTypes = {}

export default Team
