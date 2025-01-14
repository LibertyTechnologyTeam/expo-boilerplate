import React from 'react'

import {ColorSchemeName} from 'react-native'

import {NavigationContainer} from '@react-navigation/native'
import {useTheme} from '@tamagui/core'

import {StatusBar} from '@/component'

import MainNavigation from './MainNavigation'
import {navigation} from './NavigationAction'

const Root = ({colorScheme}: {colorScheme: ColorSchemeName}) => {
  const themes = useTheme()

  const onReady = () => {
    // TODO: add sentry
    // routingInstrumentation.registerNavigationContainer(navigationRef)
  }

  return (
    <NavigationContainer onReady={onReady} ref={navigation.navigationRef}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'dark' ? '#000' : themes.background.val}
      />
      <MainNavigation />
    </NavigationContainer>
  )
}

export default Root
