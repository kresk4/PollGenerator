import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar'
import WelcomeUser from './WelcomeUser'

const Div = styled.div``;

class UserProfile extends React.Component {
    render() {
        return (
            <Div className="index">
                < Navbar />
                < WelcomeUser/>
            </Div>
        );
    }
}

export default UserProfile;
