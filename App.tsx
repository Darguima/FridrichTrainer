import React from 'react'
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar'

import Routes from './src/routes/routes'

export default function App () {
  setStatusBarBackgroundColor('#ff9900', false)

  return (

    <>
      <StatusBar style="light" translucent={false} />

      <Routes />
    </>
  )
}
