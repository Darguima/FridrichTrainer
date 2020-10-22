import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { RectButton } from 'react-native-gesture-handler'

const LandingPage:React.FC = () => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/FridichTrainerlogo.png')} style={styles.logoIcon} />

      <RectButton style={styles.buttons} onPress={() => {
        navigate('SubMenuPage', { methodPhase: 'f2l', title: 'Fridich Trainer - F2L' })
      }}>
        <Text style={styles.titleTexts}>F2L</Text>
        <Text style={styles.secondTexts}>First Two Layers</Text>
      </RectButton>

      <RectButton style={styles.buttons} onPress={() => {
        navigate('SubMenuPage', { methodPhase: 'oll', title: 'Fridich Trainer - OLL' })
      }}>
        <Text style={styles.titleTexts}>OLL</Text>
        <Text style={styles.secondTexts}>Orient Last Layer</Text>
      </RectButton>

      <RectButton style={styles.buttons} onPress={() => {
        navigate('SubMenuPage', { methodPhase: 'pll', title: 'Fridich Trainer - PLL' })
      }}>
        <Text style={styles.titleTexts}>PLL</Text>
        <Text style={styles.secondTexts}>Permuting The Last Layer</Text>
      </RectButton>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  logoIcon: {
    resizeMode: 'contain',
    width: '70%',
    height: '16%'
  },

  buttons: {
    justifyContent: 'center',
    alignItems: 'center',

    width: '70%',
    height: '10%',
    padding: '5%',
    backgroundColor: 'white',
    borderRadius: 10
  },

  titleTexts: {
    fontWeight: 'bold',
    fontSize: 16
  },

  secondTexts: {
    fontSize: 12
  }
})

export default LandingPage
