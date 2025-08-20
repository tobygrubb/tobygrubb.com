const className = classArray =>
  classArray
    .filter(x => x !== false)
    .filter(x => x !== undefined)
    .join(' ')
    .trim()

export default className
