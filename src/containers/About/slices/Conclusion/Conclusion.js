import React from 'react'
import { RichText } from 'prismic-reactjs'
import './Conclusion.scss'

const ONE_PERCENT_LOGO =
  'https://images.prismic.io/thisstaging/36b4d66c-2808-49c6-9bb1-a59122c7609f_One+Percent.svg'

const Conclusion = (props) => {
  const data = props.data.primary
  return (
    <div className="about__conclusion about__text -grid -full-height -keepBreak">
      <div className="about__conclusion__inner">
        {RichText.render(data.large_text)}
        {RichText.render(data.contact)}
        {RichText.render(data.address)}
        <a
          href="https://www.onepercentfortheplanet.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ONE_PERCENT_LOGO} alt="" />
        </a>
      </div>
    </div>
  )
}

Conclusion.defaultProps = {
  scrollSpeed: 50,
}

export default Conclusion
