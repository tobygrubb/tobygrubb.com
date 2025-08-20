import React, { useState } from 'react'
import { RichText } from 'prismic-reactjs'
import './Accordion.scss'

import uuidv1 from 'uuid/v1'
import Text from '../Text/Text'
import Columns from '../Columns/Columns'
import Instagram from '../Instagram/Instagram'
import Clients from '../Clients/ClientsWrapper'
import Team from '../Team'
import Conclusion from '../Conclusion/Conclusion'
import Gridwall from '../Gridwall/Gridwall'
import Timeline from '../Timeline/Timeline'

const Accordion = props => {

  const { data } = props
  const [active, setActive] = useState(false)

  return <div className={`accordion ${active ? 'show' : ''}`}>
      <div className="accordion__bar" onClick={() => setActive(!active)}>
        <div className="accordion__text">
          <div className="accordion__inner">
           {RichText.asText(data.content)}
          </div>
        </div>
        <div className="accordion__icon"></div>
      </div>
      <div className="accordion__content">
        <div className="accordion__content-inner">
        {data.data
          .map(slice => {
            switch (slice.slice_type) {
              case 'text':
                return <Text data={slice} />
              case 'columns':
                return <Columns data={slice} />
              case 'instagram':
                return <Instagram data={slice} />
              case 'gridwall-v2':
                return <Gridwall data={slice} />
              case 'conclusion':
                return <Conclusion data={slice} />
              case 'clients':
                return <Clients.Wrapper data={slice} />
              case 'team':
                return <Team.Wrapper data={slice} />
              case 'color-start':
                return null // used to be <ScrollTrigger />;
              case 'link_to_timeline':
                return <Timeline data={slice} />
              default:
                return null
            }
          })
          .map(slice => (
            <div className="" key={uuidv1()}>
              {slice}
            </div>
          ))}
        </div>
      </div>
  </div>
}

export default Accordion
