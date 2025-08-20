import { useState } from 'react'

export default function useNavInvert() {
  const [navInverted, setNavInvertState] = useState(false)

  const revertNav = () => setNavInvertState(false)
  const invertNav = () => setNavInvertState(true)

  return { revertNav, invertNav, navInverted }
}
