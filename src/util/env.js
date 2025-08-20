const env = {
  isStaging: window.location.host.includes('staging'),
  isLocalhost: window.location.host.includes('localhost'),
}

export default env
