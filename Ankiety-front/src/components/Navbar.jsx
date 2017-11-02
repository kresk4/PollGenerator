import React from 'react';
import styled from 'styled-components';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import api from '../api';
import {withRouter, Link} from "react-router-dom";

const NavB = styled(Navbar)`
    background: none !important;
    border-width: 0;
    border-radius: 0;
    z-index: 1;
`

@connect((state) => state.user)
class NavbarMenu extends React.Component {

    registrationTry() {
        this.props.history.push("/Registration");
    }

    loginTry() {
        this.props.history.push('/Login')
    }

    setUserProfile() {
        this.props.history.push('/userProfile')
    }

    logOut() {
        return api.logOutUser()
            .then(() => {
                this.props.dispatch({
                    type: 'CHANGE_LOGGED_STATUS',
                    payload: false,
                });
                this.setWelcome();
                this.props.history.push("/")
            })

    }

    createSurvey() {
        this.props.history.push("/createSurvey");
    }

    setWelcome() {
        this.props.history.push("/");

    }

    setNavItems() {
        if(this.props.logged) {
            return <Nav pullRight>
                <NavItem eventKey={2} onClick={::this.createSurvey}> create Survey</NavItem>
                <NavItem eventKey={2} href="#">Find Survey</NavItem>
                <NavItem eventKey={2} onClick={::this.logOut}>Log out</NavItem>
            </Nav>
        }
        return <Nav pullRight>
            <NavItem eventKey={2} href="#">Find Survey</NavItem>
            <NavItem eventKey={1} onClick={::this.registrationTry}>Register</NavItem>
            <NavItem eventKey={2} onClick={::this.loginTry}>Log in</NavItem>
        </Nav>
    }

    setNavBrand() {
        if(this.props.logged) {
            return <Navbar.Brand>
                <a href="#" onClick={::this.setUserProfile}>Survey serivce</a>
            </Navbar.Brand>
        }
        return <Navbar.Brand>
            <a href="#" onClick={::this.setWelcome}>Survey serivce</a>
        </Navbar.Brand>
    }

    render() {
        return (
            <NavB inverse collapseOnSelect>
                <Navbar.Header>
                    {this.setNavBrand()}
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {this.setNavItems()}
                </Navbar.Collapse>
            </NavB>
        );
    }
}

export default withRouter(NavbarMenu);
