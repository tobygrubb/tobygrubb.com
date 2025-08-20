import config from 'site.config'

const formatTitle = str => {
  if (str && typeof str === 'string') {
    return `${str} - ${config.title}`
  }
  return config.title
}
export default formatTitle
