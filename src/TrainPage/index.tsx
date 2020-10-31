import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-community/async-storage'
import fridich from '../fridich.json'

import HeaderPage from '../Components/HeaderPage'
import { Feather as Icon } from '@expo/vector-icons'

import { selectedCasesSchema } from '../ConfigPage'

interface fridichStepSchemaArrayItems {
  name: string,
  solve: string,
  shuffle: string
}

interface casesArraySchema {
  unsolved: Array<fridichStepSchemaArrayItems>,
  solved: Array<fridichStepSchemaArrayItems>,
}

interface SubMenuPageProps{
  route: {
    params: {
      methodPhase: 'f2l' | 'oll' | 'pll'
    }
  }
}

const TrainPage:React.FC<SubMenuPageProps> = ({ route: { params: { methodPhase } } }) => {
  const [casesArray, setCasesArray] = useState<casesArraySchema>({} as casesArraySchema)
  const [caseOnScreen, setCaseOnScreen] = useState<fridichStepSchemaArrayItems>({ name: 'Initial', shuffle: 'Initial', solve: 'Initial' })

  const [revealedSolution, setRevealedSolution] = useState<true|false>(false)

  const { goBack, navigate } = useNavigation()

  useEffect(() => {
    AsyncStorage.getItem('selectedCases').then(response => {
      if (response) {
        const selectedCases: selectedCasesSchema = JSON.parse(response)

        const unsolvedCasesArray = fridich[methodPhase].filter(item => selectedCases[methodPhase].indexOf(item.name) !== -1)

        // Shuffle the unsolvedCasesArray
        for (var arrayIndex = unsolvedCasesArray.length - 1; arrayIndex > 0; arrayIndex--) {
          var randomIndex = Math.floor(Math.random() * (arrayIndex + 1))
          var temp = unsolvedCasesArray[arrayIndex]
          unsolvedCasesArray[arrayIndex] = unsolvedCasesArray[randomIndex]
          unsolvedCasesArray[randomIndex] = temp
        }

        setCasesArray({ unsolved: unsolvedCasesArray, solved: [] })
      } else {
        setCasesArray({ unsolved: [], solved: [] })
      }
    })
  }, [])

  const sortAShufleFromCasesArray = async () => {
    if (casesArray.unsolved.length === 0) {
      setCaseOnScreen({ name: 'Final', shuffle: 'Final', solve: 'Final' })
    } else {
      setCaseOnScreen(casesArray.unsolved[0])

      const newUnsolvedCasesArray: Array<fridichStepSchemaArrayItems> = casesArray.unsolved
      const newSolvedCasesArray: Array<fridichStepSchemaArrayItems> = casesArray.solved

      newSolvedCasesArray.push(newUnsolvedCasesArray[0])
      newUnsolvedCasesArray.shift()

      setCasesArray({ unsolved: newUnsolvedCasesArray, solved: newSolvedCasesArray })

      console.log({ unsolved: newUnsolvedCasesArray, solved: newSolvedCasesArray })
    }
  }

  return (

    <>
      <HeaderPage pageName={`${methodPhase.toUpperCase()} - Train`}>
        <BorderlessButton style={styles.headerConfigButton} onPress={() => {
          navigate('ConfigPage', { methodPhase })
        }}>
          <Icon name="settings" color="#000" size={24} />
        </BorderlessButton>
      </HeaderPage>

      <View style={styles.container}>

        { caseOnScreen.name === 'Initial' &&
      <>
        <View style={styles.shufleContainer} >
          <Text style={styles.nameText}>{'Let\'s Start'}</Text>
          <Text style={styles.shufleText}>Press the button to start</Text>
        </View>

        <View style={[styles.solveButtonContainer, { borderColor: '#ffffff00' }]} />

        <RectButton style={styles.nextShufleButton} onPress={sortAShufleFromCasesArray}>
          <Text style={styles.nextShufleButtonText}>Start Training</Text>
        </RectButton>
      </>
        }

        { caseOnScreen.name !== 'Initial' && caseOnScreen.name !== 'Final' &&
      <>
        <View style={styles.shufleContainer}>
          <Text style={styles.nameText}>Case {caseOnScreen.name}</Text>
          <Text style={styles.shufleText}>{caseOnScreen.shuffle}</Text>
        </View>

        { !revealedSolution &&
        <View style={styles.solveButtonContainer}>
          <RectButton style={styles.solveButton} onPress={() => (setRevealedSolution(!revealedSolution))}>
            <Text style={styles.solveButtonText}>Show solve</Text>
          </RectButton>
        </View >
        }

        { revealedSolution &&
        <View style={styles.solveButtonContainer}>
          <RectButton style={styles.solveButton} onPress={() => (setRevealedSolution(!revealedSolution))}>
            <Text style={styles.solveText}>{caseOnScreen.solve}</Text>
            <Text style={styles.solveButtonText}>Hide solve</Text>
          </RectButton>
        </View >
        }

        <RectButton style={styles.nextShufleButton} onPress={() => { sortAShufleFromCasesArray(); setRevealedSolution(false) }}>
          <Text style={styles.nextShufleButtonText}>Next Shufle</Text>
        </RectButton>
      </>
        }

        { caseOnScreen.name === 'Final' &&
      <>
        <View style={styles.shufleContainer}>
          <Text style={styles.nameText}>You have finished</Text>
          <Text style={styles.shufleText}>Press the button to finish</Text>
        </View>

        <View style={[styles.solveButtonContainer, { borderColor: '#ffffff00' }]} />

        <RectButton style={styles.nextShufleButton} onPress={goBack}>
          <Text style={styles.nextShufleButtonText}>Return to menu</Text>
        </RectButton>
      </>
        }
      </View>
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  headerConfigButton: {
    padding: '1%'
  },

  shufleContainer: {
    width: '80%',

    justifyContent: 'center'

  },

  nameText: {
    fontSize: 23,
    textAlign: 'center'
  },

  shufleText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },

  solveButtonContainer: {
    width: '80%',

    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#ff9900'
  },

  solveButton: {
    padding: '5%'
  },

  solveText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  solveButtonText: {
    fontSize: 16,
    textAlign: 'center'
  },

  nextShufleButton: {
    width: '80%',

    backgroundColor: '#ff9900',
    padding: '5%',
    borderRadius: 15
  },

  nextShufleButtonText: {
    fontSize: 16,
    textAlign: 'center'

  }
})

export default TrainPage
