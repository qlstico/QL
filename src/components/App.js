import '../assets/css/App.css'
import Form from './reuse/Form'
import React, { Component } from 'react'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>
        <Form></Form>
        <h1>QLstico!</h1>
      </div>
    )
  }
}

export default App
