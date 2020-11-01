import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import HeaderPage from '../Components/HeaderPage'

import useCasesArray from '../contexts/casesArray'

import { Feather as Icon } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'

interface ListCasesArrayPageProps{
  route: {
    params: {
      methodPhase: 'f2l' | 'oll' | 'pll'
    }
  }
}

const ListCasesArrayPage:React.FC<ListCasesArrayPageProps> = ({ route: { params: { methodPhase } } }) => {
  const { casesArray } = useCasesArray()

  return (
    <>
      <HeaderPage pageName={`${methodPhase.toUpperCase()} - List Cases`} />

      <ScrollView>
        <View style={styles.container}>

          {
            casesArray.solved.map((item, index) => (
              <View style={[styles.solvedCase, styles.solvedAndUnsolvedCase]} key={index}>
                <View>
                  <Text style={styles.nameText}>Case {item.name}</Text>

                  <Text style={styles.shufleText}><Text style={styles.shufleTextTitle}>Shufle</Text>: {item.shuffle}</Text>
                </View>

                <View>
                  <Icon name="menu" color="#000" size={24} />
                </View>
              </View>
            ))
          }

          {
            casesArray.unsolved.map((item, index) => (
              <View style={[styles.unsolvedCase, styles.solvedAndUnsolvedCase]} key={index}>
                <View>
                  <Text style={styles.nameText}>Case {item.name}</Text>

                  <Text style={styles.shufleText}><Text style={styles.shufleTextTitle}>Shufle</Text>: {item.shuffle}</Text>
                </View>

                <View>
                  <Icon name="menu" color="#000" size={24} />
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
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

    padding: '2%',

    borderWidth: 2,
    borderRadius: 5
  },

  solvedCase: {

    borderColor: 'green'
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
