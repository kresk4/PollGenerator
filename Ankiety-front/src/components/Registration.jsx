import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Alert, FormControl} from 'react-bootstrap';
import api from '../api';
import Button from "./Button";
import CenterModal from './CenterModal';
import NavBar from './Navbar';

const H2 = styled.h2`
    color: #83878D;
    margin-bottom: 10px;
    @media screen and (max-width: 768px) {
        color: white;
    }
`

const FormControlEdit = styled(FormControl)`
    margin-bottom: 10px;
`

@connect((state) => state.user)
class Registration extends React.Component {
    constructor() {
        super()
        this.state = {
            login: '',
            password: '',
            email: '',
            error: false,
            succes: false
        }
    }

    registration() {
        api.registerUser(this.state.login, this.state.password)
            .then(() => {
                this.setState({...this.state, error: false, succes:true})
            })
            .catch(() => {
                this.setState({...this.state, error: true, succes:false})
            })
    }

    setLoginValue(e) {
        this.setState({...this.state, login: e.target.value})
    }

    setPasswordValue(e) {
        this.setState({...this.state, password: e.target.value})
    }

    setEmailValue(e) {
        this.setState({...this.state, email: e.target.value})
    }

    render() {
        return (
            <div>
                <NavBar/>
                <CenterModal>
                    {this.state.error ?
                        <Alert bsStyle="danger">
                            <strong>Something went wrong</strong>
                        </Alert> : null
                    }
                    {this.state.succes ?
                        <Alert bsStyle="success">
                            <strong>Your account was created</strong>
                        </Alert> : null
                    }
                    <H2>Registration</H2>
                    <FormControlEdit
                        type="text"
                        value={this.state.login}
                        placeholder="login"
                        onChange={::this.setLoginValue}
                    />
                    <FormControlEdit
                        type="email"
                        value={this.state.email}
                        placeholder="email"
                        onChange={::this.setEmailValue}
                    />
                    <FormControlEdit
                        type="password"
                        value={this.state.password}
                        placeholder="password"
                        onChange={::this.setPasswordValue}
                    />
                    <Button onClick = {::this.registration}> Register </Button>
                </CenterModal>
            </div>
        );
    }
}

export default Registration;
