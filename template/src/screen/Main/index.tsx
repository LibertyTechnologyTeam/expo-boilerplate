import React from 'react'

import {BottomTabHeaderProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {HStack, Text} from '@/component'
import {translate, TxKeyPath} from '@/locale'
import {Route} from '@/navigation/Route'
import {insets} from '@/theme'
import {MainTabParamListType, MainTabParamsType} from '@/types'

import Home from '../Home'
import Profile from '../Profile'
import Wallet from '../Wallet'

import {BottomTabBar} from './BottomTabBar'

const {Navigator, Screen} = createBottomTabNavigator<MainTabParamListType>()

const MainTab = () => {
  return (
    <Navigator
      screenOptions={{
        header: NavigationTab,
      }}
      tabBar={props => <BottomTabBar {...props} />}>
      <Screen
        initialParams={{
          icon: 'home-simple',
          title: 'Home',
        }}
        name={Route.Home}
        component={Home}
      />

      <Screen
        initialParams={{
          icon: 'wallet',
          title: 'Wallet',
        }}
        name={Route.Wallet}
        component={Wallet}
      />

      <Screen
        initialParams={{
          icon: 'user-circle',
          title: 'Profile',
        }}
        name={Route.Profile}
        component={Profile}
      />
    </Navigator>
  )
}

export default MainTab

const NavigationTab = ({route: {params}}: BottomTabHeaderProps) => {
  const {title} = params as MainTabParamsType

  return (
    <HStack
      bg="$background"
      justifyContent="space-between"
      paddingTop={insets.paddingTop}
      px={'$3.5'}
      pb={'$3.5'}
      gap={'$3'}>
      <Text fontWeight="bold" textAlign="right" fontSize={'$3xl'}>
        {translate(title as TxKeyPath)}
      </Text>
    </HStack>
  )
}
