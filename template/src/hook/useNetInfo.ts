import {useEffect, useState} from 'react'

import {addEventListener} from '@react-native-community/netinfo'

// NOTE: You must use Real Device
export const useNetInfo = () => {
  const [isConnected, setConnected] = useState(true)

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      setConnected(state.isConnected ?? false)
    })

    return unsubscribe()
  }, [])

  return isConnected
}
