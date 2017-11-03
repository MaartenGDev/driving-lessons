import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledListItem = styled.li`
  display: inline-block;
`
const StyledLink = styled(Link)`
    padding: 20px;
    text-decoration: none;
    color: black;
    display: inline-block;
    
    &:hover{
        background-color: rgb(236, 240, 241);
    }
`

export default (props) => {
  return <StyledListItem><StyledLink {...props} /></StyledListItem>
}