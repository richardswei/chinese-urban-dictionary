import React from 'react'
import { CookiesProvider } from 'react-cookie'
import Application from './App.js'

class AppComponent extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <Application />
      </CookiesProvider>
    )
  }
}

AppComponent.defaultProps = {}

export default AppComponent