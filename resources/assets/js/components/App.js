import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Header from './common/Header'
import About from './about/AboutPage'
import Todo from './todo/TodoPage'
import Questions from '../containers/question/QuestionPage'
import AddQuestion from '../containers/question/AddQuestion'

class App extends Component {
  render () {
    return (
      <Router>
        <main className="App">
          <Header/>

          <Route exact path="/questions" component={Questions}/>
          <Route exact path="/questions/add" component={AddQuestion}/>
          <Route exact path="/todo" component={Todo}/>
          <Route exact path="/about" component={About}/>
        </main>
      </Router>
    )
  }
}

export default App
