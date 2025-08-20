const isMobile = () =>
  /Android|BlackBerry|iPhone|iPad|iPod|IEMobile|Opera Mini/gi.test(
    window.navigator.userAgent
  )

export default isMobile
