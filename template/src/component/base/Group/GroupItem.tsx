import React, {FC, forwardRef} from 'react'

import {TouchableOpacity} from 'react-native'

import {TextProps, View, ViewProps} from '@tamagui/core'

import {fontSize, space} from '@/themes/size'

import {Icon, IconProps} from '../Icon'
import {HStack} from '../Stack'
import {Text} from '../Text'

export interface GroupItemProps extends ViewProps {
  titleProps?: TextProps
  subTitle?: string
  subTitleProps?: TextProps
  RightItem?: IconProps | FC
  LeftItem?: IconProps | FC
  border?: boolean
  onPress?: () => void
}

export const GroupItem = forwardRef<any, GroupItemProps>((props, ref) => {
  const {
    children,
    titleProps,
    subTitle,
    RightItem = {name: 'chevron-right'},
    subTitleProps,
    LeftItem,
    border = true,
    onPress,
  } = props

  return (
    <TouchableOpacity activeOpacity={0.8} ref={ref} onPress={onPress} hitSlop={space.$2}>
      <HStack gap="$2" bbw={border ? 1 : 0} bbc="$mauve4" {...props} py="$3">
        {LeftItem ? (
          typeof LeftItem === 'object' ? (
            LeftItem?.name ? (
              <Icon size="$1" color="$mauve12" {...LeftItem} />
            ) : null
          ) : (
            LeftItem({})
          )
        ) : null}
        <View flex={1}>
          {children ? (
            <Text
              fontSize={fontSize.true}
              color="$mauve12"
              fontWeight="500"
              {...titleProps}
              style={[titleProps?.style]}>
              {children as string}
            </Text>
          ) : null}
          {subTitle ? (
            <Text
              fontSize={fontSize.xs}
              color="$mauve12"
              {...subTitleProps}
              style={[subTitleProps?.style]}>
              {subTitle}
            </Text>
          ) : null}
        </View>
        {RightItem ? (
          typeof RightItem === 'object' ? (
            RightItem?.name ? (
              <Icon size={space['$3.5']} color="$mauve12" {...RightItem} />
            ) : null
          ) : (
            RightItem({})
          )
        ) : null}
      </HStack>
    </TouchableOpacity>
  )
})

GroupItem.displayName = 'GroupItem'
