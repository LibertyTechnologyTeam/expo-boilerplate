import React, {forwardRef, RefObject, useRef, useState} from 'react'

import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native'

import {BottomSheetTextInput} from '@gorhom/bottom-sheet'
import {GetProps, styled, View} from '@tamagui/core'

import {fontSize} from '@/theme'

import {Icon, IconName, IconProps} from './Icon'
import {Pressable} from './Pressable'
import {HStack} from './Stack'

type TextInputViewType = GetProps<typeof TextInputView>

const lineHeight = Math.round(fontSize.true * 1.5)

export interface InputProps extends Partial<TextInputProps & TextInputViewType> {
  icon?: IconName
  inBottomSheet?: boolean
  iconProps?: IconProps
  onClear?: (e: GestureResponderEvent) => void
  clear?: boolean
}

const TextInputView = styled(HStack, {
  padding: '$2.5',
  borderWidth: 1,
  borderRadius: '$3',

  variants: {
    multiline: {
      true: {
        // height: 'auto',
      },
    },

    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
})

export const Input = forwardRef<any, InputProps>(
  (
    {
      placeholder = 'Placeholder',
      multiline,
      icon,
      iconProps,
      value,
      inBottomSheet,
      clear,
      ...props
    },
    ref
  ) => {
    const [isFocus, setFocus] = useState(false)
    const defaultRef = useRef<TextInput>()
    const inputRef = (ref || defaultRef) as RefObject<TextInput>

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocus(true)
      props?.onFocus?.(e)
    }

    const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocus(false)
      props?.onBlur?.(e)
    }

    const onClear = (e: GestureResponderEvent) => {
      props?.onClear?.(e)
      props?.onChangeText?.('')
      inputRef?.current?.focus()
      // Haptic();
    }

    const inputProps: TextInputProps = {
      placeholder,
      onFocus,
      onBlur,
      style: style.input,
      editable: props?.editable ?? true,
      onKeyPress: props?.onKeyPress,
      onSubmitEditing: props?.onSubmitEditing,
      returnKeyLabel: props?.returnKeyLabel,
      returnKeyType: props?.returnKeyType,
      value,
      onChangeText: props?.onChangeText,
    }

    return (
      <TextInputView borderColor={isFocus ? '$blue9Light' : '$mauve4'} gap={'$2'} {...props}>
        {icon ? <Icon name={icon} size={'$1'} {...iconProps} /> : null}
        <View flex={1} height={lineHeight}>
          {inBottomSheet ? (
            <BottomSheetTextInput ref={ref} {...inputProps} />
          ) : (
            <TextInput ref={ref} {...inputProps} />
          )}
        </View>
        {clear && value?.trim?.() !== '' ? (
          <Pressable onPress={onClear} br="$9" bg="$mauve4" p="$1">
            <Icon color="$mauve10" name="x" size={14} />
          </Pressable>
        ) : null}
      </TextInputView>
    )
  }
)

const style = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: fontSize.true,
    lineHeight,
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
})
