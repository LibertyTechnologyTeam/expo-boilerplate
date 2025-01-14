import React, {useEffect, useRef} from 'react'

import {StyleSheet} from 'react-native'

import {useScrollToTop} from '@react-navigation/native'
import {FlashList} from '@shopify/flash-list'
import {View} from '@tamagui/core'

import {useDidMountEffect, useLocale, useNetInfo} from '@/hook'
import {notification} from '@/service'

export default function Home() {
  const isConnected = useNetInfo()
  const locale = useLocale()
  const listRef = useRef<FlashList<any>>(null)

  useScrollToTop(listRef as any)

  useEffect(() => {
    notification.request()
  }, [])

  const scrollToTop = () => listRef.current?.scrollToOffset({offset: 0, animated: true})

  // trigger refresh for locale && connected
  useDidMountEffect(() => {
    if (isConnected) {
      scrollToTop()
    }
  }, [isConnected, locale])

  return <View bg={'$background'} flex={1}></View>
}

const style = StyleSheet.create({
  list: {},
})
