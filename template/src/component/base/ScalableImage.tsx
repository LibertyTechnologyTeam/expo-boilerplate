import React, {useEffect, useState} from 'react'

import {ImageSourcePropType, Image as RNImage, StyleSheet} from 'react-native'

import Animated, {FadeIn} from 'react-native-reanimated'

import {screenSize} from '@/theme'

import {Image, type ImageProps} from './Image'

export interface ScalableImageProps extends ImageProps {
  onSize?: (size: {width: number; height: number}) => void
  imageWidth?: number
  imageHeight?: number
}

export const ScalableImage = (props: ScalableImageProps) => {
  const {imageHeight, imageWidth = screenSize.width} = props
  const {onSize, style: containerStyle, source} = props
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (source) checkScalable()
  }, [source])

  const checkScalable = () => {
    if (source) {
      if (typeof source === 'string') {
        const Cookie = ''

        RNImage.getSizeWithHeaders(source, {Cookie}, (width, height) => adjustSize(width, height))
      } else {
        const sourceToUse = RNImage.resolveAssetSource(source as ImageSourcePropType)
        adjustSize(sourceToUse.width, sourceToUse.height)
      }
    }
  }

  const adjustSize = (sourceWidth: number, sourceHeight: number) => {
    let ratio = 1

    if (imageWidth && imageHeight) {
      ratio = Math.min(imageWidth / sourceWidth, imageHeight / sourceHeight)
    } else if (imageWidth) {
      ratio = imageWidth / sourceWidth
    } else if (imageHeight) {
      ratio = imageHeight / sourceHeight
    }

    const computedWidth = Math.round(sourceWidth * ratio)
    const computedHeight = Math.round(sourceHeight * ratio)

    const imageSize = {width: computedWidth, height: computedHeight}

    setSize(imageSize)

    if (typeof onSize === 'function') onSize(imageSize)
  }

  const style = [size || {}, containerStyle]

  return size?.width ? (
    <Animated.View entering={FadeIn}>
      <Image {...props} style={style} source={source} />
    </Animated.View>
  ) : (
    <Image style={[{width: imageWidth}, styleSheet.image]} contentFit="contain" />
  )
}

const styleSheet = StyleSheet.create({
  image: {
    aspectRatio: 2,
    backgroundColor: '#6B7280',
  },
})
