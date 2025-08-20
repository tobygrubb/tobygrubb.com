import React, { useContext, memo } from 'react'
import { ApiDataCtx } from 'containers/App/App'
import uuidv1 from 'uuid/v1'
import Text from './slices/Text/Text'
import Image from './slices/Image/ImageWrapper'
import Video from './slices/Video/Video'
import Columns from './slices/Columns/Columns'
import Instagram from './slices/Instagram/Instagram'
import Clients from './slices/Clients/ClientsWrapper'
import Team from './slices/Team'
import Conclusion from './slices/Conclusion/Conclusion'
import Gridwall from './slices/Gridwall/Gridwall'
import Timeline from './slices/Timeline/Timeline'
import { RichText } from 'prismic-reactjs'
import Accordion from './slices/Accordion/Accordion'
import IconLink from './slices/IconLink/IconLink'
import './About.scss'
import Styled from './Styled'

function About() {
  const { about } = useContext(ApiDataCtx)

  let newSlices = []
  let accordionData = {}
  let shouldPush = false
  about.content.forEach((slice) => {

    if(slice.slice_type === 'accordion_start') {
      shouldPush = true
      accordionData = { slice_type: 'accordion', content: slice.primary.content1, data:[]}
    } else if(slice.slice_type === 'accordion_end') {
      shouldPush = false
      newSlices.push(accordionData)
    } else {
      if(shouldPush) {
        accordionData.data.push(slice)
      } else {
        newSlices.push(slice)
      }
    }
  });

  return (
    <>
    <Styled.Wrapper className="view__child">
      <div className="about-inner">
      {newSlices
        .map(slice => {
          switch (slice.slice_type) {
            case 'text':
              return <Text data={slice} />
            case 'image':
              return <Image.Wrapper data={slice} />
            case 'video':
              return <Video data={slice} />
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
            case 'accordion':
              return <Accordion data={slice} />
            case 'icon_link':
              return <IconLink type={slice.primary.icon} url={slice.primary.link.url}>
               {RichText.render(slice.primary.content1)}
              </IconLink>
            
            default:
              return (
                <p className="future">
                  {slice.slice_type}
                  goes here
                </p>
              )
          }
        })
        .map(slice => (
          <div className="about__block" key={uuidv1()}>
            {slice}
          </div>
        ))}
      </div>
    </Styled.Wrapper>
    </>
  )
}

export default memo(About)
