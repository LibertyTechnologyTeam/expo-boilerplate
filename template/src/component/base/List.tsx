import React, {forwardRef, LegacyRef, useRef} from 'react'

import {ActivityIndicator} from 'react-native'

import {FlashList, FlashListProps} from '@shopify/flash-list'
import {FadeIn, FadeOut} from 'react-native-reanimated'

import {translate} from '@/locale'

import {AnimatedView} from './Layout'
import {HStack} from './Stack'
import {Text} from './Text'

export interface ListProps extends FlashListProps<any> {
  itemKey?: 'id' | string
  loadMore?: boolean
  networkConnected?: boolean
  logAfterNLoads?: number
}

type ListRef = LegacyRef<any> | undefined

export const List = forwardRef<FlashList<any>, ListProps>((props, ref?: ListRef) => {
  const {itemKey, loadMore} = props
  const countLoadMore = useRef(0)

  const onEndReached = () => {
    props?.onEndReached?.()

    countLoadMore.current += 1
  }
  return (
    <FlashList
      ref={ref}
      keyExtractor={(item, index) =>
        `${itemKey ? item?.[itemKey]?.toString() : ''}_${index.toString()}`
      }
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={loadMore ? LoadMoreView : props?.ListFooterComponent}
      {...props}
      onEndReached={onEndReached}
    />
  )
})

export const LoadMoreView = () => {
  return (
    <AnimatedView key="LoadMoreView" entering={FadeIn} exiting={FadeOut}>
      <HStack gap="$1.5" bg="$mauve12" alignSelf="center" m="$3.5" p="$2" px="$2.5" br={8}>
        <ActivityIndicator color="white" />
        <Text color="$white1">{translate('Loading')}</Text>
      </HStack>
    </AnimatedView>
  )
}

List.displayName = 'List'
