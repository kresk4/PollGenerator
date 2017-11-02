import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Button from './Button';
import {withRouter} from "react-router-dom";

const H2 = styled.h2`
    color: #83878D;
    margin-bottom: 10px;
    @media screen and (max-width: 768px) {
        color: white;
    }
`

const H4 = styled.h4`
    color: #83878D;
    @media screen and (max-width: 768px) {
        color: white;
    }
`

@connect((state) => state.user)
class Registration extends React.Component {
    constructor() {
        super()
        this.state = {
            login: '',
            password: '',
            email: '',
            passwordRepeat: '',
            error: false,
            succes: false
        }
    }

    tryRegister() {
        this.props.history.push('/Registration');
    }

    render() {
        return (
            <div>
                <H2>Hello on our survey service</H2>
                <H4>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.</H4>
                <Button onClick = {::this.tryRegister}> Try Now </Button>
            </div>
        );
    }
}

export default withRouter(Registration);
