import {forwardRef, ReactNode, Ref, RefObject, useCallback} from 'react'

import {ViewStyle as RNViewStyle, StyleSheet} from 'react-native'

import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
  BottomSheetModal as RNBottomSheet,
  BottomSheetModalProps as RNBottomSheetProps,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet'
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types'
import {TextProps, View, ViewStyle} from '@tamagui/core'

import {fontSize, insets, size, space} from '@/theme'

import {Icon} from './Icon'
import {Pressable} from './Pressable'
import {HStack} from './Stack'
import { Text } from './Text'

export interface SheetProps extends RNBottomSheetProps {
  title?: string
  titleProps?: TextProps
  backdropProps?: BottomSheetBackdropProps
  headerStyle?: ViewStyle
  backgroundStyle?: RNViewStyle
  isScrollView?: boolean
  onClose?: () => void
}

export type SheetRef = BottomSheetModalMethods

export const Sheet = forwardRef((props: SheetProps, ref: Ref<SheetRef>) => {
  const {
    title,
    titleProps,
    backdropProps,
    headerStyle,
    backgroundStyle,
    enableDynamicSizing,
    children,
    isScrollView = false,
  } = props

  const dynamicProps = enableDynamicSizing ? {} : {snapPoints: ['50%']}

  const backdropComponent = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        style={[props.style]}
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  )

  const onClose = () => {
    (ref as RefObject<SheetRef>)?.current?.close()
    props?.onClose?.()
  }

  const onChange = (index: number, position: number, type: SNAP_POINT_TYPE) => {
    props?.onChange?.(index, position, type)
  }

  return (
    <RNBottomSheet
      ref={ref}
      backgroundStyle={[style.backgroundStyle, backgroundStyle]}
      handleComponent={() => (
        <HStack py="$3.5" justifyContent="center" px="$3.5" {...headerStyle}>
          <View flex={1} />
          <Text
            fontSize={fontSize.lg}
            fontWeight="500"
            numberOfLines={1}
            textAlign="center"
            adjustsFontSizeToFit
            flex={8}
            {...titleProps}>
            {title || ''}
          </Text>
          <Pressable flex={1} onPress={onClose} hitSlop={space.$2}>
            <Icon name="x" size={size.$1} color="$mauve10" />
          </Pressable>
        </HStack>
      )}
      backdropComponent={backdropComponent}
      enablePanDownToClose
      enableHandlePanningGesture
      {...dynamicProps}
      {...props}
      onChange={onChange}>
      {enableDynamicSizing && !isScrollView ? (
        <BottomSheetView style={style.bottomSheetView}>
          {children as ReactNode[] | ReactNode}
        </BottomSheetView>
      ) : (
        children
      )}
    </RNBottomSheet>
  )
})

Sheet.displayName = 'Sheet'

const style = StyleSheet.create({
  backgroundStyle: {
    borderRadius: space['$4.5'],
    paddingBottom: insets.paddingBottom,
  },
  bottomSheetView: {
    paddingBottom: insets.bottom,
  },
})
