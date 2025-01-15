import React, {useRef} from 'react'

import {ColorSchemeName} from 'react-native'

import {useLogger} from '@react-navigation/devtools'
import {NavigationContainer} from '@react-navigation/native'
import {useTheme} from '@tamagui/core'

import {StatusBar} from '@/component'

import MainNavigation from './MainNavigation'
import {navigation} from './NavigationAction'

const Root = ({colorScheme}: {colorScheme: ColorSchemeName}) => {
  const themes = useTheme()

  useLogger(navigation.navigationRef)

  const onReady = () => {
    // TODO: add sentry
    // routingInstrumentation.registerNavigationContainer(navigationRef)
  }

  return (
    <NavigationContainer
      ref={navigation.navigationRef}
      // onStateChange={async () => {
      // TODO: add analytics tracking screen
      // }}
      onReady={onReady}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#000' : themes.background.val}
      />
      <MainNavigation />
    </NavigationContainer>
  )
}

export default Root
