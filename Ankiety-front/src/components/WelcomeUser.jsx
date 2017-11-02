import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withRouter} from "react-router-dom";
import CenterModal from "./CenterModal";
import api from "../api";
import Button from './Button';

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
class WelcomeUser extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        return api.getUserDetails()
            .then((res) => {
                this.props.dispatch({
                    type: 'SET_LOGIN',
                    payload: res.login,
                })
            })
    }

    createSurvey() {
        this.props.history.push("/createSurvey");
    }

    render() {
        return (
            <CenterModal>
               <H2>Hello {this.props.login}</H2>
               <H4>Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa.</H4>
                <Button onClick = {::this.createSurvey}>Create</Button>
            </CenterModal>
        );
    }
}

export default withRouter(WelcomeUser);
