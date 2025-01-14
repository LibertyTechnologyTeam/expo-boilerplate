import React from 'react'

import {GestureResponderEvent, TouchableOpacity, TouchableOpacityProps} from 'react-native'

import {TextProps, View, ViewProps} from '@tamagui/core'

import {Text} from './Text'

type PressableViewProps = Omit<ViewProps, 'children'> & TouchableOpacityProps

export interface PressableProps extends PressableViewProps {
  titleProps?: TextProps

  tracking?: {
    //
  }
}

export function Pressable({children, activeOpacity = 0.8, titleProps, ...props}: PressableProps) {
  const onPress = (e: GestureResponderEvent) => {
    props?.onPress?.(e)
  }

  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
      <View {...props} onPress={null}>
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text {...titleProps}>{children || ''}</Text>
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  )
}
