import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
    width: calc(100% - 40px);
    margin: 10px auto 0 auto;
    padding: 10px;
`;

export default ({children}) => {
    return (
        <Container children={children}/>
    );
};