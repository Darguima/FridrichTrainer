import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import fridich from '../fridich.json'
import { RectButton } from 'react-native-gesture-handler'

interface fridichStepSchemaArrayItems {
  name: string,
  solve: string,
  shuffle: string
}

interface SubMenuPageProps{
  route: {
    params: {
      methodPhase: 'f2l' | 'oll' | 'pll'
    }
  }
}

const StartPage:React.FC<SubMenuPageProps> = ({ route: { params: { methodPhase } } }) => {
  const [selectedCases, setSelectedCases] = useState<Array<string>>([] as Array<string>)
  const [casesArray, setCasesArray] = useState<Array<fridichStepSchemaArrayItems>>([{ name: 'Wait a moment', shuffle: 'Wait a moment', solve: 'Wait a moment' }])

  const [caseOnScreen, setCaseOnScreen] = useState<fridichStepSchemaArrayItems>({ name: 'Wait a moment', shuffle: 'Wait a moment', solve: 'Wait a moment' })

  useEffect(() => {
    AsyncStorage.getItem('selectedCases').then(response => {
      if (response) {
        setSelectedCases(JSON.parse(response)[methodPhase])
      }
    })
  }, [])

  useEffect(() => {
    setCasesArray(fridich[methodPhase].filter(item => selectedCases.indexOf(item.name) !== -1))
  }, [selectedCases])

  const sortAShufleFromCasesArray = () => {
    const sortedCaseIndex = Math.floor(Math.random() * casesArray.length)
    const sortedShufle = casesArray[sortedCaseIndex]

    if (sortedShufle) {
      setCaseOnScreen(sortedShufle)

      setCasesArray(casesArray.filter(item => item !== sortedShufle))
    }

    if (casesArray.length === 0) {
      setCaseOnScreen({ name: 'Final', shuffle: 'No more Shufle', solve: 'No more solves' })
    }
  }

  return (

    <View style={styles.container}>
      <View>
        <Text style={styles.nameText}>Case {caseOnScreen.name}</Text>
        <Text style={styles.shufleText}>{caseOnScreen.shuffle}</Text>
      </View>

      <RectButton style={styles.nextShufleButton} onPress={sortAShufleFromCasesArray}>
        <Text style={styles.nextShufleButtonText}>Next Shufle</Text>
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

  nameText: {
    fontSize: 23,
    textAlign: 'center'
  },

  shufleText: {
    fontWeight: 'bold',
    fontSize: 20
  },

  nextShufleButton: {
    backgroundColor: '#AAA',
    padding: '5%',
    borderRadius: 15
  },

  nextShufleButtonText: {
    fontSize: 16
  }
})

export default StartPage
