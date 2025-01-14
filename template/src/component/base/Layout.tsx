import {styled, View} from '@tamagui/core'
import Animated from 'react-native-reanimated'

export const Container = styled(View, {
  name: 'Container',
  bg: '$background',
  flex: 1,
})

export const Divider = styled(View, {
  name: 'Divider',
  width: '100%',
  height: 1,
  backgroundColor: '$mauve4',
})

export const AnimatedView = styled(Animated.View)
