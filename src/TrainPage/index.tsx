import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View, StyleSheet } from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'

import fridich from '../fridich.json'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler'

import HeaderPage from '../Components/HeaderPage'
import { Feather as Icon } from '@expo/vector-icons'

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

const TrainPage:React.FC<SubMenuPageProps> = ({ route: { params: { methodPhase } } }) => {
  const [selectedCases, setSelectedCases] = useState<Array<string>>([] as Array<string>)
  const [casesArray, setCasesArray] = useState<Array<fridichStepSchemaArrayItems>>([{ name: 'Initial', shuffle: 'Initial', solve: 'Initial' }])
  const [caseOnScreen, setCaseOnScreen] = useState<fridichStepSchemaArrayItems>({ name: 'Initial', shuffle: 'Initial', solve: 'Initial' })

  const [revealedSolution, setRevealedSolution] = useState<true|false>(false)

  const { goBack, navigate } = useNavigation()

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
      setCaseOnScreen({ name: 'Final', shuffle: 'Final', solve: 'Final' })
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
