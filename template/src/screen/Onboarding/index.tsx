import React from 'react'

import {Bottom, Button, Container} from '@/component'
import {navigation} from '@/navigation'

export default function Onboarding() {
  const onNext = () => {
    navigation.navigate('Main')
  }

  return (
    <Container>
      
      <Bottom>
        <Button onPress={onNext}>Next</Button>
      </Bottom>
    </Container>
  )
}
