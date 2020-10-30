import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { RectButton } from 'react-native-gesture-handler'

const LandingPage:React.FC = () => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/FridichTrainerlogo.png')} style={styles.logoIcon} />

      <View style={styles.buttonsBorder}>
        <RectButton style={styles.buttons} onPress={() => {
          navigate('TrainPage', { methodPhase: 'f2l' })
        }}>
          <Text style={styles.buttonsTitleTexts}>F2L</Text>
          <Text style={styles.buttonsSecondTexts}>First Two Layers</Text>
        </RectButton>
      </View>

      <View style={styles.buttonsBorder}>
        <RectButton style={styles.buttons} onPress={() => {
          navigate('TrainPage', { methodPhase: 'oll' })
        }}>
          <Text style={styles.buttonsTitleTexts}>OLL</Text>
          <Text style={styles.buttonsSecondTexts}>Orient Last Layer</Text>
        </RectButton>
      </View>

      <View style={styles.buttonsBorder}>
        <RectButton style={styles.buttons} onPress={() => {
          navigate('TrainPage', { methodPhase: 'pll' })
        }}>
          <Text style={styles.buttonsTitleTexts}>PLL</Text>
          <Text style={styles.buttonsSecondTexts}>Permuting The Last Layer</Text>
        </RectButton>
      </View>

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

  buttonsBorder: {
    width: '70%',
    height: '10%',
    backgroundColor: 'white',

    borderRadius: 10,
    borderColor: '#ff9900',
    borderWidth: 3
  },

  buttons: {
    width: '100%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonsTitleTexts: {
    fontWeight: 'bold',
    fontSize: 16
  },

  buttonsSecondTexts: {
    fontSize: 12
  }
})

export default LandingPage
