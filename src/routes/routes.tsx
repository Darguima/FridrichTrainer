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
        <Screen name="LandingPage" component={LandingPage}/>

        <Screen name="SubMenuPage" component={SubMenuPage}/>

        <Screen name="ConfigPage" component={ConfigPage}/>

        <Screen name="StartPage" component={StartPage}/>
      </Navigator>
    </NavigationContainer>
  )
}

export default Routes
