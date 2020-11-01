import React from 'react'
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar'

import Routes from './src/routes/routes'

import { CasesArrayProvider } from './src/contexts/casesArray'

export default function App () {
  setStatusBarBackgroundColor('#ff9900', false)

  return (

    <CasesArrayProvider>
      <StatusBar style="light" translucent={false} />

      <Routes />
    </CasesArrayProvider>
  )
}
