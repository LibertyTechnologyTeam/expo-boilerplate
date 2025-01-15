import React from 'react'

import {StyleSheet, View, ViewProps} from 'react-native'

import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller'
import Animated, {Extrapolation, interpolate, useAnimatedStyle} from 'react-native-reanimated'

import {colors, insets, space} from '@/theme'

export interface BottomViewProps extends ViewProps {
  /**
   * When true, the bottom view will automatically adjust its position
   * to avoid being covered by the keyboard when it appears
   */
  avoidKeyboard?: boolean
}

export const Bottom = (props: BottomViewProps) => {
  const {avoidKeyboard} = props
  return (
    <View style={[style.container, props?.style]}>
      {avoidKeyboard ? (
        <AvoidKeyboardView>
          <BottomView {...props} />
        </AvoidKeyboardView>
      ) : (
        <BottomView {...props} />
      )}
      <View style={{height: insets.bottom}} />
    </View>
  )
}

interface AvoidKeyboardView extends ViewProps {}

const AvoidKeyboardView = ({children}: AvoidKeyboardView) => {
  const {height, progress} = useReanimatedKeyboardAnimation()

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [0, height.value + insets.bottom], {
      extrapolateRight: Extrapolation.CLAMP,
    })

    const paddingBottom = interpolate(progress.value, [0, 1], [0, space['$3.5']], {
      extrapolateRight: Extrapolation.CLAMP,
    })

    return {
      transform: [{translateY}],
      paddingBottom,
    }
  })

  return <Animated.View style={[style.container, animatedStyle]}>{children}</Animated.View>
}

const BottomView = (props: BottomViewProps) => {
  const {children} = props
  return (
    <View {...props} style={[style.bottomView, props.style]}>
      {children}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: colors.mauve.mauve4
  },
  bottomView: {
    paddingHorizontal: space['$3.5'],
    paddingTop: space['$3.5'],
  },
})
