import env from './env'

const error = text => {
  if (env.isLocalhost || env.isStaging) {
    console.info(
      `%c${text}`,
      'background: red; color: white; padding: 10px; border-radius: 4px; margin: 10px 0;'
    )
  }
}

export default error
