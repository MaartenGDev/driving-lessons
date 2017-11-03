import React, { Component } from 'react'
import styled from 'styled-components'
import NavigationItem from './NavigationItem'

const StyledHeader = styled.header`
  color: red;
  background-color: green;
`

const List = styled.ul`
  margin: 0;
  padding: 0
`

export default class Header extends Component {
  render () {
    return (
      <StyledHeader>
        <nav>
          <List>
            <NavigationItem to={'/questions'}>Questions</NavigationItem>
            <NavigationItem to={'/about'}>About</NavigationItem>
            <NavigationItem to={'/todo'}>Todo</NavigationItem>
            <NavigationItem to={'/docs'}>Docs</NavigationItem>
          </List>
        </nav>
      </StyledHeader>
    )
  }
}