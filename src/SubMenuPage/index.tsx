import React from 'react'

import { Text, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

interface SubMenuPageProps{
  route: {
    params: {
      methodPhase: number
    }
  }
}

const SubMenuPage:React.FC<SubMenuPageProps> = ({ route: { params: { methodPhase } } }) => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <RectButton style={styles.buttons} onPress={() => {
        navigate('ConfigPage', { methodPhase })
      }}>
        <Text style={styles.texts}>Configurations</Text>
      </RectButton>

      <RectButton style={styles.buttons} onPress={() => {
      }}>
        <Text style={styles.texts}>Statistics</Text>
      </RectButton>

      <RectButton style={styles.buttons} onPress={() => {
        navigate('StartPage', { methodPhase })
      }}>
        <Text style={styles.texts}>Start</Text>
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
    backgroundColor: 'red',
    borderRadius: 10
  },

  texts: {
    fontWeight: 'bold'
  }
})

export default SubMenuPage
