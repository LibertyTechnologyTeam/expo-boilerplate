import React, {useRef} from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {enableScreens} from 'react-native-screens'

import {NavigationBar} from '@/component'
import {useTranslate} from '@/hook'
import Home from '@/screen/Home'
import MainTab from '@/screen/Main'
import Onboarding from '@/screen/Onboarding'
import {storage} from '@/service'
import {StackList} from '@/types'

import HeaderGroup from './HeaderGroup'
import {Group, Navigator, Screen} from './NavigationAction'
import {Route} from './Route'

enableScreens()

const initialRouteName = () => (storage.getBoolean('OLD_USER') ? Route.Main : Route.Onboarding)

export default function MainNavigator() {
  return (
    <Navigator
      initialRouteName={initialRouteName()}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Screen name={Route.Onboarding} component={Onboarding} />
      <Screen name={Route.Main} component={MainTab} />
      <Screen name={Route.Home} component={Home} />
      {/* <HeaderGroup /> */}
    </Navigator>
  )
}
