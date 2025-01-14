import {FC} from 'react'

import {GestureResponderEvent} from 'react-native'

import {TextProps, View, ViewStyle} from '@tamagui/core'

import {navigation} from '@/navigation'
import {fontSize, insets, space} from '@/theme/size'

import {Icon} from './Icon'
import {Image} from './Image'
import {Pressable} from './Pressable'
import {HStack} from './Stack'
import {Text} from './Text'

type AccessoryItem = {
  color: string
}

export interface NavigationBarProps {
  title?: string
  image?: string
  RightItem?: FC<AccessoryItem>
  LeftItem?: FC<AccessoryItem>
  CenterItem?: FC<AccessoryItem>
  titleProps?: TextProps
  style?: ViewStyle
  onBack?: (e: GestureResponderEvent) => void
  hideBack?: boolean
}

export const NavigationBar = (props: NavigationBarProps) => {
  const {RightItem, titleProps, hideBack = false, LeftItem, CenterItem} = props

  const onBack = (e: GestureResponderEvent) => {
    if (typeof props?.onBack === 'function') return props?.onBack?.(e)
    navigation.goBack()
  }

  const renderCenterItem = () => {
    if (props?.image) {
      return <Image contentFit="contain" flex={1} source={props.image} />
    }

    if (props?.title) {
      return <Title {...titleProps}>{props?.title}</Title>
    }

    if(CenterItem) return CenterItem({color: ''})
  }
  return (
    <HStack bg="$background" gap="$3.5" pt={insets.paddingTop} pb="$3.5" px="$3.5">
      {LeftItem ? (
        <View flex={2}>{LeftItem ? LeftItem({color: ''}) : null}</View>
      ) : !hideBack ? (
        <View flex={2}>
          <Pressable onPress={onBack} hitSlop={space.$2}>
            <Icon name="chevron-left" size="$2" color="$mauve12" />
          </Pressable>
        </View>
      ) : (
        <View flex={2} />
      )}
      <View flex={6}>{renderCenterItem()}</View>
      <View flex={2} alignItems="flex-end">
        {typeof RightItem !== 'undefined' ? RightItem({color: ''}) : null}
      </View>
    </HStack>
  )
}

const Title = ({children, ...props}: TextProps) => {
  return (
    <Text
      {...props}
      numberOfLines={1}
      textAlign="center"
      fontSize={fontSize.lg}
      color="$mauve12"
      fontWeight="bold"
      style={[props?.style]}>
      {children}
    </Text>
  )
}
