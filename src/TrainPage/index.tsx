import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'

import AsyncStorage from '@react-native-community/async-storage'
import useCasesArray, { fridrichCaseSchema } from '../contexts/casesArray'
import fridrich from '../fridrich.json'

import HeaderPage from '../Components/HeaderPage'
import { Feather as Icon } from '@expo/vector-icons'

import { SvgXml } from 'react-native-svg'
import f2lSimulation from '../f2l_simulation.json'
import ollSimulation from '../oll_simulation.json'
import pllSimulation from '../pll_simulation.json'

export interface selectedCasesSchema {
  'f2l': Array<string>,
  'oll': Array<string>,
  'pll': Array<string>,
}

interface TrainPageProps{
  route: {
    params: {
      methodPhase: 'f2l' | 'oll' | 'pll'
    }
  }
}

const TrainPage:React.FC<TrainPageProps> = ({ route: { params: { methodPhase } } }) => {
  const { casesArray, setCasesArray, caseOnScreen, setCaseOnScreen } = useCasesArray()

  useEffect(() => setCaseOnScreen({ name: 'Initial', shuffle: 'Initial', solve: 'Initial', solved: true }), [])

  const [revealedSolution, setRevealedSolution] = useState<true|false>(false)
  const [revealedCube, setRevealedCube] = useState<true|false>(false)

  const { goBack, navigate } = useNavigation()

  useEffect(() => {
    AsyncStorage.getItem('selectedCases').then(response => {
      if (response) {
        const selectedCases: selectedCasesSchema = JSON.parse(response)

        const unsolvedCasesArray = fridrich[methodPhase]
          .filter(item => selectedCases[methodPhase].indexOf(item.name) !== -1)
          .map(item => ({ ...item, solved: false }))

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
    if (casesArray.unsolved.length === 1 && casesArray.solved.length !== 0) {
      const newUnsolvedCasesArray: Array<fridrichCaseSchema> = casesArray.unsolved
      const newSolvedCasesArray: Array<fridrichCaseSchema> = casesArray.solved

      newSolvedCasesArray.push({ ...newUnsolvedCasesArray[0], solved: true })
      newUnsolvedCasesArray.shift()

      setCasesArray({ unsolved: newUnsolvedCasesArray, solved: newSolvedCasesArray })

      setCaseOnScreen({ name: 'Final', shuffle: 'Final', solve: 'Final', solved: true })
    } else {
      if (caseOnScreen.name !== 'Initial') {
        const newUnsolvedCasesArray: Array<fridrichCaseSchema> = casesArray.unsolved
        const newSolvedCasesArray: Array<fridrichCaseSchema> = casesArray.solved

        newSolvedCasesArray.push({ ...newUnsolvedCasesArray[0], solved: true })
        newUnsolvedCasesArray.shift()

        setCasesArray({ unsolved: newUnsolvedCasesArray, solved: newSolvedCasesArray })
      }

      setCaseOnScreen(casesArray.unsolved[0] || { name: 'Final', shuffle: 'Final', solve: 'Final', solved: true })
    }
  }

  return (

    <>
      <HeaderPage pageName={`${methodPhase.toUpperCase()} - Train`}>
        <BorderlessButton style={styles.headerConfigButton} onPress={() => {
          navigate('ListCasesArrayPage', { methodPhase })
        }}>
          <Icon name="menu" color="#000" size={24} />
        </BorderlessButton>

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
          <Text style={styles.caseNumber}>Case {casesArray.solved.length + 1} of {casesArray.solved.length + casesArray.unsolved.length}</Text>

          <Text style={styles.nameText}>Case {caseOnScreen.name}</Text>
          <Text style={styles.shufleText}>{caseOnScreen.shuffle}</Text>
        </View>

        { !revealedCube &&
        <View style={styles.cubeRevealButtonContainer}>
          <RectButton style={styles.cubeRevealButton} onPress={() => (setRevealedCube(!revealedCube))}>
            <Text style={styles.cubeRevealButtonText}>Show cube</Text>
          </RectButton>
        </View >
        }

        { revealedCube &&
        <View style={styles.cubeRevealButtonContainer}>
          <RectButton style={styles.cubeRevealButton} onPress={() => (setRevealedCube(!revealedCube))}>
            <SvgXml

              style={[methodPhase === 'f2l' ? { marginVertical: 0 } : { marginVertical: '4%' }, styles.cubeRevealSvg] }

              height={methodPhase === 'f2l' ? 175 : 100}
              width={methodPhase === 'f2l' ? 175 : 100}
              viewBox={methodPhase === 'f2l' ? '0 0 142 106' : '0 0 38 38'}
              xml={(() => {
                /* Ignore the Typescripts errosrerrors, this is secure and final point */
                if (methodPhase === 'f2l') {
                  return f2lSimulation[caseOnScreen.name]
                } else if (methodPhase === 'oll') {
                  return ollSimulation[caseOnScreen.name]
                } else if (methodPhase === 'pll') {
                  return pllSimulation[caseOnScreen.name]
                }
              })() || ''}
            />
          </RectButton>
        </View >
        }

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

        <RectButton style={styles.nextShufleButton} onPress={() => { sortAShufleFromCasesArray(); setRevealedSolution(false); setRevealedCube(false) }}>
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

  caseNumber: {
    fontSize: 14,
    textAlign: 'center',

    paddingBottom: 15
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

  cubeRevealButtonContainer: {
    width: '80%',

    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#ff9900'
  },

  cubeRevealButton: {
    padding: '5%',
    alignItems: 'center'

  },

  cubeRevealSvg: {
  },

  cubeRevealButtonText: {
    fontSize: 16,
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
