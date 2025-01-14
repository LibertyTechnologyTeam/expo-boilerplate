import React from 'react'

import {StyleSheet, View, ViewProps} from 'react-native'

import {useReanimatedKeyboardAnimation} from 'react-native-keyboard-controller'
import Animated, {Extrapolation, interpolate, useAnimatedStyle} from 'react-native-reanimated'

import {insets, space} from '@/theme'

export interface BottomViewProps extends ViewProps {
  avoidKeyboard?: boolean
}

export const BottomView = (props: BottomViewProps) => {
  const {avoidKeyboard} = props
  return (
    <View style={[style.container, props?.style]}>
      {avoidKeyboard ? (
        <AvoidKeyboardView>
          <Bottom {...props} />
        </AvoidKeyboardView>
      ) : (
        <Bottom {...props} />
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

  // const spacingAnimated = useAnimatedStyle(() => {
  //   const height = interpolate(progress.value, [0, 1], [0, space.md], {
  //     extrapolateRight: Extrapolation.CLAMP,
  //   })
  //   return {
  //     height,
  //   }
  // })

  return <Animated.View style={[style.container, animatedStyle]}>{children}</Animated.View>
}

const Bottom = (props: BottomViewProps) => {
  const {children} = props
  return (
    <View {...props} style={[style.bottomView, props.style]}>
      {children}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    shadowOpacity: 0.04,

    borderTopLeftRadius: space['$3.5'],
    borderTopRightRadius: space['$3.5'],
    borderTopWidth: 1,
  },
  bottomView: {
    paddingHorizontal: space['$3.5'],
    paddingTop: space['$3.5'],
  },
})
