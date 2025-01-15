import React, {useRef, useState} from 'react'

import {useColorScheme} from 'react-native'

import {View} from '@tamagui/core'
import {useSharedValue} from 'react-native-reanimated'
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel'

import {images} from '@/asset'
import {Bottom, Button, Container, Image, Pressable, Text} from '@/component'
import {useTranslate} from '@/hook'
import {navigation} from '@/navigation'
import {onHaptic, storage} from '@/service'
import {fontSize, screenSize} from '@/theme'

const data = [
  {
    title: 'Welcome to Liberty',
    description: 'Discover a powerful app designed to streamline your digital experience',
  },
  {
    title: 'Modern Design',
    description: 'Clean interface with powerful features to enhance your productivity',
  },
  {
    title: "Let's Start",
    description: 'Begin your journey with us and explore amazing possibilities',
  },
]

export default function Onboarding() {
  const translate = useTranslate()
  const progress = useSharedValue<number>(0)
  const colorScheme = useColorScheme()
  const carouselRef = useRef<ICarouselInstance>(null)
  const [index, setIndex] = useState(0)

  const imageList = Object.values(images.onboarding[colorScheme ?? 'light'])

  const onProgressChange = (_: number, absoluteProgress: number) => {
    progress.value = Math.round(absoluteProgress)
  }

  const onPressPagination = (index: number) => {
    const i = index - progress.value

    carouselRef.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: i,
      animated: true,
    })
  }

  const onSkip = () => {
    storage.set('OLD_USER', true)
    navigation.replace('Main')
  }

  const onNext = () => {
    onHaptic()

    const i = progress.value

    if (index === 2) {
      onSkip()
      return
    }

    setIndex(index => index + 1)
    onPressPagination(i + 1)
  }

  return (
    <Container>
      <View flex={1}>
        <Carousel
          ref={carouselRef}
          width={screenSize.width}
          pagingEnabled
          autoPlay={false}
          loop={false}
          data={data}
          onSnapToItem={setIndex}
          onProgressChange={onProgressChange}
          renderItem={({item, index}) => (
            <SwipeItem
              key={`carousel-introduction-${index}`}
              item={item}
              image={imageList[index]}
            />
          )}
        />
      </View>
      <Bottom gap="$3.5">
        <Button onPress={onNext}>Next</Button>
        <Pressable
          opacity={index === 2 ? 0 : 1}
          disabled={index === 2}
          onPress={() => {
            onSkip()
          }}>
          <Text textAlign="center" fontWeight="bold" textTransform="uppercase">
            {translate('Skip')}
          </Text>
        </Pressable>
      </Bottom>
    </Container>
  )
}
const SwipeItem = ({item, image}: {item: (typeof data)[0]; image: number}) => {
  const {title, description} = item

  return (
    <View
      flex={1}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bg="$background075"
      gap="$4.5"
      p="$4.5">
      <Image source={image} aspectRatio={1} contentFit="cover" width={'90%'} />
      <View gap="$2">
        <Text textAlign="center" fontWeight="bold" fontSize={fontSize['4xl']}>
          {title}
        </Text>
        <Text textAlign="center" fontSize={fontSize['lg']}>
          {description}
        </Text>
      </View>
    </View>
  )
}
