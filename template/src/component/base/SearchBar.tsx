import React from 'react'

import {StyleSheet, TextInput} from 'react-native'

import {View, useTheme} from '@tamagui/core'

import {Input} from './Input'

type SearchBarProps = {
  //
}

export function SearchBar(props: SearchBarProps) {
  return (
    <View background={'$background'} style={style.container}>
      <View borderColor={'$mauve12'} borderWidth={1}>
        <Input />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    //
  },
})
