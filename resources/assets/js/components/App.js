import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom'
import Header from './common/Header'
import About from './about/AboutPage'
import ManageQuestion from '../containers/question/ManageQuestion'
import ManageExam from '../containers/exam/ManageExam'
import ExamPage from '../containers/exam/ExamPage'
import ExamQuestionsPage from '../containers/exam/ExamQuestionsPage'

class App extends Component {
  render () {
    return (
      <Router>
        <main className="App">
          <Header/>

          <Switch>
            <Route exact path="/exams" component={ExamPage}/>

            <Route exact path="/exams/:id/questions" component={ExamQuestionsPage}/>
            <Route exact path="/exams/:id/questions/add" component={ManageQuestion}/>
            <Route exact path="/exams/:id/questions/:questionId/edit" component={ManageQuestion}/>

            <Route exact path="/exams/add" component={ManageExam}/>
            <Route exact path="/exams/:id/edit" component={ManageExam}/>

            <Route exact path="/about" component={About}/>
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App
