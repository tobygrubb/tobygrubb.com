import { useEffect, useState } from 'react'
import fetchJsonp from 'fetch-jsonp'

const useFetch = url => {
  const [data, setData] = useState(null)

  const getData = async () => {
    const response = await fetchJsonp(url)
    setData(await response.json())
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  return data
}

export default useFetch
