import React, {memo} from 'react'

import {ColorSchemeName, StyleSheet, TouchableOpacity, useColorScheme} from 'react-native'

import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import {ColorTokens, View} from '@tamagui/core'
import * as NavigationBar from 'expo-navigation-bar'

import {HStack, Icon, Text} from '@/component'
import {useDidMountEffect, useTranslate} from '@/hook'
import {onHaptic, RNLayoutAnimation} from '@/service'
import {insets} from '@/theme'

export const BottomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const translate = useTranslate()
  const theme = useColorScheme()

  const isVideo = state.routeNames[state.index] === 'Video'
  const themeColor = isVideo ? 'dark' : theme

  useDidMountEffect(() => {
    if (themeColor === 'dark') {
      NavigationBar.setBackgroundColorAsync('hsla(0, 15%, 10%, 1)')
      NavigationBar.setButtonStyleAsync('light')
      NavigationBar.setPositionAsync('absolute')
    } else {
      NavigationBar.setBackgroundColorAsync('hsla(0, 15%, 99%, 1)')
      NavigationBar.setButtonStyleAsync('dark')
    }
  }, [themeColor])

  return (
    <View
      bg="$background"
      theme={themeColor}
      borderTopWidth={1}
      borderTopColor="$mauve4"
      pb={insets.bottom}>
      <HStack alignItems="flex-start" paddingTop="$2">
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key]
          const params = route?.params
          const icon = (params as any)?.icon
          const title = (params as any)?.title

          const isFocused = state.index === index
          const color: ColorTokens = isFocused ? '$accentColor' : '$mauve10'

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          //
          const onPress = () => {
            onHaptic()

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              // TODO: Tracking
              navigation.navigate(route.name)
              RNLayoutAnimation()
            }
          }

          return (
            <TouchableOpacity
              key={route.name}
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={style.tabItem}>
              {/* <Icon name={icon} color={color} size={'$1.5'} /> */}
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                fontSize="$xs"
                width="100%"
                textAlign="center"
                color={isFocused ? '$accentColor' : '$mauve10'}
                fontWeight={isFocused ? '500' : '400'}>
                {translate(title)}
              </Text>
            </TouchableOpacity>
          )
        })}
      </HStack>
    </View>
  )
}

const style = StyleSheet.create({
  tabItem: {
    flex: 1,
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})
