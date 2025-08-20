import React from 'react'
import { RichText } from 'prismic-reactjs'
import './Text.scss'

const Text = props => {
  const { text, layout, class_names: classNames } = props.data.primary

  const classes = [
    'about__text',
    '-grid',
    layout ? `-${layout}` : '',
    classNames || '',
  ].join(' ')

  return <div className={classes}>{RichText.render(text)}</div>
}

export default Text
