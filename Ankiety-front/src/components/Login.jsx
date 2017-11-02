import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Alert, FormControl} from 'react-bootstrap';
import api from '../api';
import {withRouter} from "react-router-dom";
import CenterModal from "./CenterModal";
import NavBar from "./Navbar";
import Button from "./Button";

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
class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            login: '',
            password: '',
            error: false,
            succes: false
        }
    }

    loginSend() {
        api.loginUser(this.state.login, this.state.password)
            .then(() => {
                this.props.dispatch({
                    type: 'CHANGE_LOGGED_STATUS',
                    payload: true,
                });
                this.props.history.push("/userProfile");
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

    render() {
        return (
            <div>
                <NavBar/>
                <CenterModal>
                    {this.state.error ?
                        <Alert bsStyle="danger">
                            <strong>Wrong password or login</strong>
                        </Alert> : null
                    }
                    {this.state.succes ?
                        <Alert bsStyle="success">
                            <strong>Succes correct login and password</strong>
                        </Alert> : null
                    }
                    <H2>Login</H2>
                    <FormControlEdit
                        type="text"
                        value={this.state.login}
                        placeholder="login"
                        onChange={::this.setLoginValue}
                    />
                    <FormControlEdit
                        type="password"
                        value={this.state.password}
                        placeholder="password"
                        onChange={::this.setPasswordValue}
                    />
                        <Button onClick = {::this.loginSend}> Login </Button>
                </CenterModal>
            </div>
        );
    }
}

export default withRouter(Login);
