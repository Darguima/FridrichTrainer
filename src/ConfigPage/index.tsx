import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-community/async-storage'

import fridich from '../fridich.json'

interface selectedCasesSchema {
  'f2l': Array<string>,
  'oll': Array<string>,
  'pll': Array<string>,
}

interface SubMenuPageProps{
  route: {
    params: {
      methodPhase: 'f2l' | 'oll' | 'pll'
    }
  }
}

const ConfigPage:React.FC<SubMenuPageProps> = ({ route: { params: { methodPhase } } }) => {
  const [selectedCases, setSelectedCases] = useState<selectedCasesSchema>({
    f2l: [],
    oll: [],
    pll: []
  })

  useEffect(() => {
    AsyncStorage.getItem('selectedCases').then(response => {
      if (response) {
        const selectedCasesArray = JSON.parse(response)
        setSelectedCases(selectedCasesArray)
      }
    })
  }, [])

  const handleCaseButtonPress = (caseName: string) => {
    if (selectedCases[methodPhase].indexOf(caseName) < 0) {
      setSelectedCases({ ...selectedCases, [methodPhase]: [...selectedCases[methodPhase], caseName] })

      AsyncStorage.setItem('selectedCases', JSON.stringify({ ...selectedCases, [methodPhase]: [...selectedCases[methodPhase], caseName] }))
    } else {
      let newStepArray: Array<string> = [...selectedCases[methodPhase], caseName]

      newStepArray = newStepArray.filter(item => item !== caseName)

      setSelectedCases({ ...selectedCases, [methodPhase]: newStepArray })

      AsyncStorage.setItem('selectedCases', JSON.stringify({ ...selectedCases, [methodPhase]: newStepArray }))
    }
  }

  const returnActualStatusOfCase = (caseName: string) => {
    if (selectedCases[methodPhase].indexOf(caseName) < 0) {
      return <Text style={styles.caseSelectStatusFalse}>Selected: {'False'}</Text>
    } else {
      return <Text style={styles.caseSelectStatusTrue}>Selected: {'True'}</Text>
    }
  }

  return (
    <ScrollView style={styles.container}>
      {fridich[methodPhase].map((item, index) => (
        <RectButton key={index} style={styles.caseButton} onPress={() => handleCaseButtonPress(item.name)}>
          <View>
            <Text style={styles.caseTitle}>Case {item.name}</Text>
            <Text style={styles.caseShufle}>Solve: {item.solve}</Text>
            <Text style={styles.caseShufle}>Shufle: {item.shuffle}</Text>
          </View>
          <View>
            {returnActualStatusOfCase(item.name)}
          </View>
        </RectButton>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee'
  },

  caseButton: {
    backgroundColor: '#fff',
    margin: '5%',
    padding: '5%',
    borderRadius: 10
  },

  caseTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',

    textAlign: 'center'
  },

  caseShufle: {},

  caseSelectStatusTrue: {
    color: 'green'
  },

  caseSelectStatusFalse: {
    color: 'red'
  }

})

export default ConfigPage
