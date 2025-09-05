import React from 'react'
import { RichText } from 'prismic-reactjs'
import './Conclusion.scss'

const Conclusion = (props) => {
  const data = props.data.primary
  return (
    <div className="about__conclusion about__text -grid -full-height -keepBreak">
      <div className="about__conclusion__inner">
        {RichText.render(data.large_text)}
        {RichText.render(data.contact)}
        {RichText.render(data.address)}
      </div>
    </div>
  )
}

Conclusion.defaultProps = {
  scrollSpeed: 50,
}

export default Conclusion
