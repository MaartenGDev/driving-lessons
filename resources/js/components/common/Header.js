import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return (
      <header className="border-b-2 border-b-gray-200 shadow">
        <nav className="container mx-auto">
          <ul className="flex list-reset">
            <li><Link className="text-gray-700 hover:text-blue-700 p-4 inline-block no-underline" to={'/exams'}>Exams</Link></li>
            <li><Link className="text-gray-700 hover:text-blue-700 p-4 inline-block no-underline" to={'/about'}>About</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}
