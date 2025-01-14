import {Haptics, ImpactFeedbackStyle, NotificationFeedbackType} from 'react-native-nitro-haptics'

import {IS_IOS} from '@/common'

export const onHaptic = (style: ImpactFeedbackStyle = 'soft') => {
  if (IS_IOS) Haptics.impact(style)
}

export const onHapticNotification = (style: NotificationFeedbackType = 'success') => {
  if (IS_IOS) Haptics.notification(style)
}

export const onSelection = () => {
  if (IS_IOS) Haptics.selection()
}
