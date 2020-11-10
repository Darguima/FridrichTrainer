import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-community/async-storage'
import useCasesArray, { fridichCaseSchema } from '../contexts/casesArray'

import fridich from '../fridich.json'
import HeaderPage from '../Components/HeaderPage'

import { selectedCasesSchema } from '../TrainPage'

interface ConfigPageProps{
  route: {
    params: {
      methodPhase: 'f2l' | 'oll' | 'pll'
    }
  }
}

const ConfigPage:React.FC<ConfigPageProps> = ({ route: { params: { methodPhase } } }) => {
  const [selectedCases, setSelectedCases] = useState<selectedCasesSchema>({
    f2l: [],
    oll: [],
    pll: []
  })

  const { casesArray, setCasesArray } = useCasesArray()

  useEffect(() => {
    AsyncStorage.getItem('selectedCases').then(response => {
      if (response) {
        const selectedCasesArray = JSON.parse(response)
        setSelectedCases(selectedCasesArray)
      }
    })
  }, [])

  const handleCaseButtonPress = (caseName: string) => {
    if (selectedCases[methodPhase].indexOf(caseName) === -1) {
      setSelectedCases({ ...selectedCases, [methodPhase]: [...selectedCases[methodPhase], caseName] })

      AsyncStorage.setItem('selectedCases', JSON.stringify({ ...selectedCases, [methodPhase]: [...selectedCases[methodPhase], caseName] }))

      // Add this shuffle to the casesArrayContext
      var shufle = fridich[methodPhase].find(item => item.name === caseName)

      // To prevent ;)
      if (shufle) {
        const newUnsolvedCasesArray: Array<fridichCaseSchema> = casesArray.unsolved
        var randomIndex = Math.floor(Math.random() * (newUnsolvedCasesArray.length + 1))

        newUnsolvedCasesArray.splice(randomIndex, 0, { ...shufle, solved: false })

        setCasesArray({ solved: casesArray.solved, unsolved: newUnsolvedCasesArray })
      }
    } else {
      let newStepArray: Array<string> = [...selectedCases[methodPhase], caseName]

      newStepArray = newStepArray.filter(item => item !== caseName)

      setSelectedCases({ ...selectedCases, [methodPhase]: newStepArray })

      AsyncStorage.setItem('selectedCases', JSON.stringify({ ...selectedCases, [methodPhase]: newStepArray }))

      // Remove this shuffle on the casesArrayContext
      const shufle = fridich[methodPhase].find(item => item.name === caseName)

      // To prevent ;)
      if (shufle) {
        const newSolvedCasesArray: Array<fridichCaseSchema> = casesArray.solved
        const newUnsolvedCasesArray: Array<fridichCaseSchema> = casesArray.unsolved

        if (newSolvedCasesArray.indexOf({ ...shufle, solved: false }) !== -1) {
          newSolvedCasesArray.splice(newSolvedCasesArray.indexOf({ ...shufle, solved: false }), 1)
        }

        if (newUnsolvedCasesArray.indexOf({ ...shufle, solved: false }) !== -1) {
          newUnsolvedCasesArray.splice(newUnsolvedCasesArray.indexOf({ ...shufle, solved: false }), 1)
        }

        setCasesArray({ solved: newSolvedCasesArray, unsolved: newUnsolvedCasesArray })
      }
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

    <>
      <HeaderPage pageName={`${methodPhase.toUpperCase()} - Config Page`}/>

      <ScrollView style={styles.container}>
        {fridich[methodPhase].map((item, index) => (
          <View key={index} style={styles.buttonsBorder}>
            <RectButton style={styles.caseButton} onPress={() => handleCaseButtonPress(item.name)}>
              <View>
                <Text style={styles.caseTitle}>Case {item.name}</Text>
                <Text style={styles.caseShufle}>Solve: {item.solve}</Text>
                <Text style={styles.caseShufle}>Shufle: {item.shuffle}</Text>
              </View>
              <View>
                {returnActualStatusOfCase(item.name)}
              </View>
            </RectButton>
          </View>
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee'
  },

  buttonsBorder: {
    margin: '5%',

    backgroundColor: 'white',

    borderColor: '#ff9900',
    borderWidth: 2,
    borderRadius: 10
  },

  caseButton: {
    padding: '5%',

    backgroundColor: '#fff',
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
