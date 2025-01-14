import React from 'react'

import {images} from '@/asset'
import {size as Size} from '@/theme'

import {Image, ImageProps} from './Image'

interface AvatarProps extends ImageProps {
  size?: keyof typeof Size
}

export const Avatar = (props: AvatarProps) => {
  const {size = '$5.75', placeholder = images.placeholder} = props

  return (
    <Image
      placeholder={placeholder}
      placeholderContentFit="cover"
      bg="$mauve4"
      contentFit="cover"
      {...props}
      br={Size[size]}
      width={Size[size]}
      height={Size[size]}
      style={[props?.style]}
    />
  )
}
