import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return (
      <header className="border-b-2 border-grey-light shadow">
        <nav className="container mx-auto">
          <ul className="flex list-reset">
            <li><Link className="text-blue hover:text-blue-darker p-4 inline-block no-underline" to={'/exams'}>Exams</Link></li>
            <li><Link className="text-blue hover:text-blue-darker p-4 inline-block no-underline" to={'/about'}>About</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}