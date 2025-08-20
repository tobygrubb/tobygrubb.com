import React from 'react'
import './Pullquote.scss'

const Pullquote = props => {
  const { quote, source } = props.data.value[0]

  return (
    <div className="casestudy__text -wrap">
      <h1>{quote}</h1>
      <cite>
        <h3>{source}</h3>
      </cite>
    </div>
  )
}

export default Pullquote
