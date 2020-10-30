import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingPage from '../LandingPage'

import TrainPage from '../TrainPage'

import ConfigPage from '../ConfigPage'

const Routes = () => {
  const { Navigator, Screen } = createStackNavigator()

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>

        <Screen
          name="LandingPage"
          component={LandingPage}
          options={{ title: 'Fridich Trainer' }}
        />

        <Screen
          name="TrainPage"
          component={TrainPage}
        />

        <Screen
          name="ConfigPage"
          component={ConfigPage}
        />

      </Navigator>
    </NavigationContainer>
  )
}

export default Routes
