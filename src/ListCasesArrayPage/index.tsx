import React from 'react'
import { Text, View, StyleSheet, GestureResponderEvent } from 'react-native'

import HeaderPage from '../Components/HeaderPage'

import useCasesArray, { fridichCaseSchema } from '../contexts/casesArray'

import { Feather as Icon } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DraggableFlatList from 'react-native-draggable-flatlist'

interface ListCasesArrayPageProps{
  route: {
    params: {
      methodPhase: 'f2l' | 'oll' | 'pll'
    }
  }
}

const ListCasesArrayPage:React.FC<ListCasesArrayPageProps> = ({ route: { params: { methodPhase } } }) => {
  const { casesArray, setCasesArray, caseOnScreen } = useCasesArray()

  const saveNewData = ({ data }: { data:Array<fridichCaseSchema>}) => {
    const newSolvedCasesArray: Array<fridichCaseSchema> = []
    const newUnsolvedCasesArray: Array<fridichCaseSchema> = []

    var recordingSolvedCases = caseOnScreen.name !== 'Initial'

    data.map(item => {
      if (item.name === caseOnScreen.name) {
        recordingSolvedCases = false
      }

      if (recordingSolvedCases) {
        newSolvedCasesArray.push({ ...item, solved: true })
      }

      if (!recordingSolvedCases) {
        newUnsolvedCasesArray.push({ ...item, solved: false })
      }
    })

    setCasesArray({ solved: newSolvedCasesArray, unsolved: newUnsolvedCasesArray })
  }

  return (
    <>
      <HeaderPage pageName={`${methodPhase.toUpperCase()} - List Cases`} />

      <>
        <DraggableFlatList
          data={[...casesArray.solved, ...casesArray.unsolved]}
          renderItem={({ item, drag }: {item: fridichCaseSchema, drag: (event: GestureResponderEvent) => void}) => {
            return (
              <TouchableOpacity
                key={item.name}
                onLongPress={drag}
                delayLongPress={200}
              >
                <View style={
                  item.solved
                    ? [styles.solvedCase, styles.solvedAndUnsolvedCase]
                    : (item.name === caseOnScreen.name
                      ? [styles.onScreenCase, styles.solvedAndUnsolvedCase]
                      : [styles.unsolvedCase, styles.solvedAndUnsolvedCase]
                    )

                }>
                  <View>
                    <Text style={styles.nameText}>Case {item.name}</Text>

                    <Text style={styles.shufleText}><Text style={styles.shufleTextTitle}>Shufle</Text>: {item.shuffle}</Text>
                  </View>

                  <View>
                    <Icon name="menu" color="#000" size={24} />
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item) => `draggable-item-${item.name}`}
          onDragEnd={saveNewData}
        />
      </>

    </>
  )
}

const styles = StyleSheet.create({
  container: {},

  solvedAndUnsolvedCase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    margin: '3%',
    marginHorizontal: '5%',

    padding: '2%',

    borderWidth: 2,
    borderRadius: 5
  },

  solvedCase: {

    borderColor: 'green'
  },

  onScreenCase: {
    borderColor: 'black'
  },

  unsolvedCase: {
    borderColor: 'red'
  },

  nameText: {
    fontSize: 15,
    fontWeight: 'bold'
  },

  shufleText: {
    fontSize: 13
  },

  shufleTextTitle: {
    fontWeight: 'bold'
  }
})

export default ListCasesArrayPage

/*
Object {
    "name": "7",
    "shuffle": "R' U2 R' D' R U2 R' D R2",
    "solve": "R2 D' R U2 R' D R U2 R",
    "solved": false,
  },

  Object {
    "name": "7",
    "shuffle": "R' U2 R' D' R U2 R' D R2",
    "solve": "R2 D' R U2 R' D R U2 R",
    "solved": false,
  },

  */
