'use strict';

import styled from 'styled-components';

import gif from '../image/Wedges.gif';

const Loader = styled.div`
    margin: 0 auto;
    background-color: transparent;
    background-image: url(${gif});
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    background-size: cover;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`;

export default Loader;