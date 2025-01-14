import React from 'react'

import {BottomTabHeaderProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {HStack, Image, Text} from '@/component'
import {translate, TxKeyPath} from '@/locale'
import {navigation} from '@/navigation'
import {Route} from '@/navigation/Route'
import {insets} from '@/theme'
import {MainTabParamListType, MainTabParamsType} from '@/types'

import Home from '../Home'
import Menu from '../Menu'

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
          icon: 'home',
          title: 'Home',
        }}
        name={Route.Home}
        component={Home}
      />

      <Screen
        initialParams={{
          icon: 'menu-list',
          title: 'Menu',
        }}
        name={Route.Menu}
        component={Menu}
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
      <Text fontWeight="700" textAlign="right" color="$accentColor" fontSize={'$3xl'}>
        {translate(title as TxKeyPath)}
      </Text>
    </HStack>
  )
}
