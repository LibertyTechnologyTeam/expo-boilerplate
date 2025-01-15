import React from 'react'

import {View} from '@tamagui/core'

import {Bottom, Button, Container} from '@/component'
import {navigation} from '@/navigation'

export default function Onboarding() {
  const onNext = () => {
    navigation.replace('Main')
  }

  return (
    <Container>
      <View flex={1}></View>
      <Bottom>
        <Button onPress={onNext}>Next</Button>
      </Bottom>
    </Container>
  )
}
