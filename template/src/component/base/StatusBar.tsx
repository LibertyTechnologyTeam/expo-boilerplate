import React from 'react'

import {StatusBar as RNStatusBar, StatusBarProps as RNStatusBarProps} from 'react-native'

import {useIsFocused} from '@react-navigation/native'

export interface StatusBarProps extends RNStatusBarProps {
  //
}

export const StatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused()
  return isFocused ? <RNStatusBar {...props} /> : null
}
