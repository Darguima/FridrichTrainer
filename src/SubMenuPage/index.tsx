import React from 'react'

import { Text, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

export interface SubMenuPageProps{
  route: {
    params: {
      methodPhase: 'f2l' | 'oll' | 'pll',
      title: string
    }
  }
}

const SubMenuPage:React.FC<SubMenuPageProps> = ({ route: { params: { methodPhase } } }) => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <RectButton style={styles.buttons} onPress={() => {
        navigate('ConfigPage', { methodPhase, title: `Configuration - ${methodPhase.toUpperCase()}` })
      }}>
        <Text style={styles.texts}>Configurations</Text>
      </RectButton>

      <RectButton style={styles.buttons} onPress={() => {
      }}>
        <Text style={styles.texts}>Statistics</Text>
      </RectButton>

      <RectButton style={styles.buttons} onPress={() => {
        navigate('StartPage', { methodPhase, title: `Training - ${methodPhase.toUpperCase()}` })
      }}>
        <Text style={styles.texts}>Start training</Text>
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
    justifyContent: 'center',
    alignItems: 'center',

    width: '70%',
    height: '10%',
    padding: '5%',
    backgroundColor: 'white',
    borderRadius: 10
  },

  texts: {
    fontWeight: 'bold'
  }
})

export default SubMenuPage
