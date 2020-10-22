import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingPage from '../LandingPage'

import SubMenuPage from '../SubMenuPage'

import ConfigPage from '../ConfigPage'

import StartPage from '../StartPage'

const Routes = () => {
  const { Navigator, Screen } = createStackNavigator()

  return (
    <NavigationContainer>
      <Navigator>

        <Screen
          name="LandingPage"
          component={LandingPage}
          options={{ title: 'Fridich Trainer' }}
        />

        <Screen
          name="SubMenuPage"
          component={SubMenuPage}
          // Typescript - just trust that title is in params object
          options={({ route }) => ({ title: route.params!.title })}
        />

        <Screen
          name="ConfigPage"
          component={ConfigPage}
          // Typescript - just trust that title is in params object
          options={({ route }) => ({ title: route.params!.title })}
        />

        <Screen
          name="StartPage"
          component={StartPage}
          // Typescript - just trust that title is in params object
          options={({ route }) => ({ title: route.params!.title })}
        />
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes
