import React from 'react'
import { RichText } from 'prismic-reactjs'
import './Gridwall.scss'

const Gridwall = props => {
  const { items } = props.data

  return (
    <div className="about__gridwall -wrap">
      {items.map((item, index) => {
        const { url } = item.image
        const { layout, hover } = item
        const itemHasHover = hover.length !== 0
        const key = url + index

        return (
          <div
            className={`about__gridwall__item ${layout}`}
            key={key}
            style={{ backgroundImage: `url('${url}')` }}
          >
            {itemHasHover && (
              <div className="about__gridwall__description">
                <div className="about__gridwall__description__inner">
                  {RichText.render(hover)}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Gridwall
