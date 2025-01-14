import React, {ReactNode, useEffect, useState} from 'react'

import {ViewStyle} from 'react-native'

import {Slider as RangeSlider, SliderProps as RNSliderProps} from '@miblanchard/react-native-slider'
import {SliderOnChangeCallback} from '@miblanchard/react-native-slider/lib/types'
import {ColorScheme, useTheme} from '@tamagui/core'

import useDebounceState from '@/hooks/debounce/useDebounceState'
import {size} from '@/themes/size'

export interface SliderProps extends Omit<RNSliderProps, 'animationType'> {
  style?: ViewStyle
  renderBubble?: ({index, value}: {index: number; value: number}) => ReactNode
  animationType?: 'spring' | 'timing'
  trackStyle?: ViewStyle
  minimumTrackTintColor?: ColorScheme
  thumbTintColor?: ColorScheme
}

export const Slider = (props: SliderProps) => {
  const theme = useTheme()
  const {
    step = 1,
    minimumTrackTintColor = '$accentColor',
    thumbTintColor = '$accentColor',
    trackStyle = {height: size['$0.25'], backgroundColor: theme['$mauve6']?.val},
  } = props
  const [isSliding, setSliding] = useState(false)
  const [debounceSliding] = useDebounceState(isSliding, 100)
  const [value, setValue] = useState<SliderProps['value']>(props.value ?? [0, 100])
  useEffect(() => {
    if (!debounceSliding) setValue(props.value)
  }, [props.value, debounceSliding])

  const onValueChange = (value: number[], index: number) => {
    setValue(value[0])
    props?.onValueChange?.(value, index)
  }

  const onSlidingStart = (value: number[], index: number) => {
    setSliding(true)
    props?.onSlidingStart?.(value, index)
  }

  const onSlidingComplete: SliderOnChangeCallback = (value, index) => {
    setSliding(false)
    props?.onSlidingComplete?.(value, index)
  }

  return (
    <RangeSlider
      {...props}
      value={value}
      step={step}
      containerStyle={props.style}
      onValueChange={onValueChange}
      trackStyle={trackStyle}
      minimumTrackTintColor={theme[minimumTrackTintColor]?.val}
      thumbTintColor={theme[thumbTintColor]?.val}
      thumbStyle={{height: isSliding ? 20 : 0}}
      onSlidingStart={onSlidingStart}
      onSlidingComplete={onSlidingComplete}
    />
  )
}
