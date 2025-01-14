import React from 'react'

import {ImageSourcePropType} from 'react-native'
import type {ImageRequireSource} from 'react-native'

import {styled, ViewProps} from '@tamagui/core'
import {Image as ExpoImage, ImageProps as ExpoImageProps, ImageSource} from 'expo-image'

import images from '@/assets/images'

type Source = ImageRequireSource | string | ImageSource | ImageSourcePropType

export type ExtendedImageProps = ExpoImageProps & ViewProps

export interface ImageProps extends Omit<ExtendedImageProps, 'source' | 'placeholder'> {
  source?: Source
  placeholder?: Source
  headers?: ImageSource['headers']
}

const ImageView = styled(ExpoImage, {})

export const Image = ({placeholder = images.placeholder, ...props}: ImageProps) => {
  const {source} = props

  const defaultSourceProps = {
    // headers: props?.headers ?? {
    //   Cookie,
    // },
    // priority: props?.priority,
    // cache: props?.cache,
  }

  const imageSource =
    typeof source === 'string'
      ? {
          uri: source,
          ...defaultSourceProps,
        }
      : typeof source === 'number'
        ? source
        : {
            ...(source as ImageSource),
            ...defaultSourceProps,
          }

  return (
    <ImageView
      {...props}
      source={imageSource}
      placeholder={placeholder}
      placeholderContentFit="cover"
      // animatePresence={true}
      // animation="100ms"
    />
  )
}
