import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import Header from './common/Header'
import About from './about/AboutPage'
import Questions from '../containers/question/QuestionPage'
import ManageQuestion from '../containers/question/ManageQuestion'
import TestPage from '../containers/test/TestPage'

class App extends Component {
  render () {
    return (
      <Router>
        <main className="App">
          <Header/>

          <Switch>
            <Route exact path="/questions" component={Questions}/>
            <Route exact path="/questions/add" component={ManageQuestion}/>
            <Route exact path="/questions/:id" component={ManageQuestion}/>
            <Route exact path="/tests" component={TestPage}/>
            <Route exact path="/about" component={About}/>
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App
