import React, { useContext, useState, useEffect } from 'react'
import { RichText } from 'prismic-reactjs'
import { ApiDataCtx } from 'containers/App/App'
import Styled from './Styled'
import { TimelineData } from 'types/slices/timeline'

/**
 * Components
 */

const useTimelineData = (id: string) => {
  const { api } = useContext(ApiDataCtx)
  const [timelineData, setTimelineData] = useState(null)

  useEffect(() => {
    api.getByID(id).then(res => setTimelineData(res.data))
  }, [api, id])

  return timelineData
}

/**
 * Timeline
 */

const Timeline = ({ data }) => {
  const timelineData: TimelineData = useTimelineData(data.primary.link.id)

  if (timelineData) {
    return <Years data={timelineData} />
  }
  return null
}

/**
 * Year
 */

interface YearProps {
  data: TimelineData
}

const Years: React.FC<YearProps> = ({ data }) => {
  return (
    <div className="-wrap">
      <h2>{data.current_title}</h2>

      <Styled.ProjectYear>
        {data.current.map(item => (
          <Styled.Project key={item.category}>
            <Styled.Title>{item.category}</Styled.Title>
            <h3>{RichText.asText(item.items)}</h3>
          </Styled.Project>
        ))}
      </Styled.ProjectYear>

      <div>
        {data.body.map(year => {
          const yearName = RichText.asText(year.primary.year)

          return (
            <Styled.Year key={yearName}>
              <h2>{yearName}</h2>
              <Projects items={year.items} />
            </Styled.Year>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Projects
 */

const Projects = ({ items }) => {
  return (
    <Styled.ProjectYear>
      {items.map(item => (
        <Styled.Project key={RichText.asText(item.description)}>
          <Styled.Title>{RichText.render(item.name)}</Styled.Title>
          <Styled.Description>
            {RichText.asText(item.description)}
          </Styled.Description>
          <h3>{RichText.asText(item.roles)}</h3>
        </Styled.Project>
      ))}
    </Styled.ProjectYear>
  )
}

export default Timeline
