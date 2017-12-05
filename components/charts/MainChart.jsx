import React from 'react';
import {withRouter} from "react-router-dom";
import CenterModal from "../CenterModal";
import styled from "styled-components";
import NavBar from "../Navbar";
import BarChart from "./BarChart";
import {connect} from 'react-redux';

const Test = styled(CenterModal)`
    height: 75%;
    width: 90%;
    overflow: scroll;
`

@connect((state) => state.survey)
class MainChart extends React.Component {
    constructor() {
        super()
        this.state = {
            height: 0,
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            height: this.test.clientHeight,
        })
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Test innerRef={x => this.test = x}>
                    <BarChart height={this.state.height} surveyData={this.props.surveyInfo}/>
                </Test>
            </div>
        );
    }
}

export default withRouter(MainChart);
