import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    padding: 20px 0 20px 20px;
    text-decoration: none;
    color: black;
    display: block;

    &:hover{
        background-color: rgb(236, 240, 241);
    }
`;

export default (props) => {
    return <li><StyledLink {...props} /></li>;
}