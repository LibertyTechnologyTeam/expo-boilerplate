import React, {ReactElement, createContext} from 'react'

import { View, ViewProps } from '@tamagui/core'

import {GroupItem} from './GroupItem'

export const GroupContext = createContext<{lastChild: string}>({lastChild: ''})

export interface GroupProps extends Omit<ViewProps, 'children'> {
  children?: ReactElement[] | React.ReactNode
}

const Group = (props: GroupProps) => {
  const {children} = props
  return (
    <View {...props} style={[props?.style]}>
      {children}
    </View>
  )
}

export default Object.assign(Group, {
  Item: GroupItem,
})
