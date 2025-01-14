// import {withDelay, withSpring, withTiming} from 'react-native-reanimated';

import {LayoutAnimation} from 'react-native'

// export const LayoutTransition = values => {
//   'worklet';
//   return {
//     animations: {
//       originY: withTiming(values.targetOriginY, {duration: 250}),
//       width: withTiming(values.targetWidth, {duration: 250}),
//       height: withTiming(values.targetHeight, {duration: 250}),
//     },
//     initialValues: {
//       originX: values.currentOriginX,
//       originY: values.currentOriginY,
//       width: values.currentWidth,
//       height: values.currentHeight,
//     },
//   };
// };

export const RNLayoutAnimation = (
  options: {
    callback?: () => void
    duration?: number
  } = {}
) => {
  LayoutAnimation.configureNext(
    {
      duration: options?.duration || 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
    () => {
      if (typeof options?.callback === 'function') {
        options?.callback?.()
      }
    }
  )
}
