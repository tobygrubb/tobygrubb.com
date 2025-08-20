import React from 'react'
import PropTypes from 'prop-types'
import DataWrapper from './DataWrapper'
import Styled from './Styled'

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  if (match && match[2].length === 11) {
    return match[2]
  }
  return 'error'
}

function YouTube({ url, ratio }) {
  const id = getId(url)
  return (
    <Styled.Wrapper padding={ratio}>
      <Styled.Iframe
        title="yt"
        src={`https://www.youtube.com/embed/${id}?showinfo=0&controls=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Styled.Wrapper>
  )
}

YouTube.Wrapper = DataWrapper

YouTube.propTypes = {
  url: PropTypes.string.isRequired,
  ratio: PropTypes.number.isRequired,
}

export default YouTube
