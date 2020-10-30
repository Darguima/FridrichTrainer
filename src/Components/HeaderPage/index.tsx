import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Feather as Icon } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'

interface HeaderPageProps {
  pageName: string,
}

const HeaderPage:React.FC<HeaderPageProps> = ({ pageName, children }) => {
  const { goBack } = useNavigation()

  return (
    <View style={styles.container}>
      <BorderlessButton style={styles.goBackButton} onPress={goBack}>
        <Icon style={styles.goBackButtonIcon} name="arrow-left" color="#000" size={24}/>
      </BorderlessButton>

      <Text style={styles.pageNameText}>{pageName}</Text>

      {
        // If not have any child we put an translucid icon to center the page name
        children || <Icon name="settings" color="#00000000" size={24}/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
    height: '10%',
    backgroundColor: '#ff9900',

    paddingLeft: '2%',
    paddingRight: '5%'

  },

  goBackButton: {
    marginRight: '2%',
    padding: '1%'
  },

  goBackButtonIcon: {
  },

  pageNameText: {
    fontSize: 18,
    fontWeight: 'bold',

    marginLeft: '2%'
  }

})

export default HeaderPage
