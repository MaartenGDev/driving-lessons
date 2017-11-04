import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return (
      <header className="border-b-2 border-grey-light shadow">
        <nav className="container mx-auto">
          <ul className="flex list-reset">
            <li className="mr-6"><Link className="text-blue hover:text-blue-darker p-4 inline-block" to={'/questions'}>Questions</Link></li>
            <li className="mr-6"><Link className="text-blue hover:text-blue-darker p-4 inline-block" to={'/about'}>About</Link></li>
            <li className="mr-6"><Link className="text-blue hover:text-blue-darker p-4 inline-block" to={'/todo'}>Todo</Link></li>
            <li className="mr-6"><Link className="text-blue hover:text-blue-darker p-4 inline-block" to={'/docs'}>Docs</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}