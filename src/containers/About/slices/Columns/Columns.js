import React from 'react'
import uuidv1 from 'uuid/v1'
import { About } from 'containers/About/styles'
import { RichText } from 'prismic-reactjs'

const Columns = ({ data }) => {
  const { items } = data
  const getColumnCount = () => {
    switch (data.primary.layout) {
      case 'col-2':
        return 2
      case 'col-3':
        return 3
      case 'col-4':
        return 4
      default:
        return 3
    }
  }

  const title = data.primary.section_title

  return (
    <About.FullHeightWrapper>
      {title && <About.SectionTitle>{title}</About.SectionTitle>}
      <About.ColumnWrapper>
        {items.map(item => (
          <About.Column key={uuidv1()} items={getColumnCount()} fullMobile>
            {RichText.render(item.text)}
          </About.Column>
        ))}
      </About.ColumnWrapper>
    </About.FullHeightWrapper>
  )
}

export default Columns
