import React, {useRef} from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {enableScreens} from 'react-native-screens'

import {NavigationBar} from '@/component'
import {useTranslate} from '@/hook'
import Home from '@/screen/Home'
import MainTab from '@/screen/Main'
import Onboarding from '@/screen/Onboarding'
import Profile from '@/screen/Profile'
import {storage} from '@/service'
import {StackList} from '@/types'

import {Route} from './Route'

export const {Screen, Navigator, Group} = createNativeStackNavigator<StackList>()

enableScreens()

const initialRouteName = () => (storage.getBoolean('OLD_USER') ? Route.Main : Route.Onboarding)

export default function MainNavigator() {
  const translate = useTranslate()

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

      <Group
        screenOptions={{
          headerShown: true,
          header: props => <NavigationBar title={props.options.title} />,
        }}>
        <Screen name={Route.Profile} component={Profile} options={{title: translate('Personal')}} />
      </Group>
    </Navigator>
  )
}
