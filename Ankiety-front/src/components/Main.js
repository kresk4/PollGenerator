import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Welcome from './Welcome';
import Navbar from './Navbar'
import {withRouter} from "react-router-dom";

const Div = styled.div``;

@connect((state) => state.user)
class AppComponent extends React.Component {

  getMainModal() {
      if(this.props.logged) {
          this.props.history.push("/userProfile");
      } else {
          return <Div className="index">
              < Navbar />
              < Welcome />
          </Div>
      }
  }

  render() {
    return (
        this.getMainModal()
    )
  }
}

export default withRouter(AppComponent);
