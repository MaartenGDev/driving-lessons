import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: block;
`
const StyledHeader = styled.header`
  color: red;
  background-color: green;
`

const List = styled.ul`
  margin: 0;
  padding: 0
`

const ListItem = styled.li`
  display: inline-block;
`

export default class Header extends Component {
  render () {
    return (
      <StyledHeader>
        <nav>
          <List>
            <ListItem><MenuLink to={'/questions'}>Questions</MenuLink></ListItem>
            <ListItem><MenuLink to={'/about'}>About</MenuLink></ListItem>
            <ListItem><MenuLink to={'/todo'}>Todo</MenuLink></ListItem>
            <ListItem><MenuLink to={'/docs'}>Docs</MenuLink></ListItem>
          </List>
        </nav>
      </StyledHeader>
    )
  }
}