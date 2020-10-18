import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { RectButton } from 'react-native-gesture-handler'

const LandingPage:React.FC = () => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>

      <RectButton style={styles.buttons} onPress={() => {
        navigate('SubMenuPage', { methodPhase: 'f2l' })
      }}>
        <Text style={styles.texts}>F2L</Text>
      </RectButton>

      <RectButton style={styles.buttons} onPress={() => {
        navigate('SubMenuPage', { methodPhase: 'oll' })
      }}>
        <Text style={styles.texts}>OLL</Text>
      </RectButton>

      <RectButton style={styles.buttons} onPress={() => {
        navigate('SubMenuPage', { methodPhase: 'pll' })
      }}>
        <Text style={styles.texts}>PLL</Text>
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

  buttons: {
    alignItems: 'center',

    width: '50%',
    padding: '5%',
    backgroundColor: 'yellow',
    borderRadius: 10
  },

  texts: {
    fontWeight: 'bold'
  }
})

export default LandingPage
