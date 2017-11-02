import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Navbar from './Navbar'
import {withRouter} from "react-router-dom";
import CenterModal from "./CenterModal";
import {
    PanelGroup,
    Panel,
    InputGroup,
    FormControl,
    FormGroup,
    Button,
    Glyphicon
} from 'react-bootstrap';

const Div = styled.div``;
const Test = styled(CenterModal)`
    height: 75%;
    width: 75%;
`

const QueryHistoryModel = styled.div`
    float: left;
    height: 100%;
    width: 30%;
    background: red;
    overflow: scroll;
`

const QueryModel = styled.div`
    float: right;
    height: 100%;
    width: 70%;
    background: blue;
    text-align: center;
    padding: 20px 10px;
`

const SurveyNameModel = styled.div`
    height: 10%;
    width: 100%;
    background: yellow;
    font-size: 24px;
    overflow: scroll;
`

const AnswerDiv = styled.div`
    padding: 15px 0 0 30px;
`

@connect((state) => state.survey)
class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeQuery: '',
            activeIndex: 0,
            answerCount: 0,
        }
    }

    generateQueryHistry() {
        return this.props.surveyQuestions.map((query, index) => {
            return <Panel header={query.name} eventKey={index}>testowyTest</Panel>
        })
    }

    saveQuery() {
        const {activeQuery, activeIndex} = this.state;
        this.props.dispatch({
            type: 'CREATE_QUERY',
            payload: {
                name: activeQuery,
                index: activeIndex,
            }
        })
    }

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            console.log('DUPA')
            return this.generateAnswer();
        }
    }

    generateAnswer() {
        this.setState({
            ...this.state,
            answerCount: this.state.answerCount+1,
        })
    }

    generateQuestion() {
        if(this.state.answerCount === 1) {
            return  <AnswerDiv>
            <InputGroup>
                <InputGroup.Addon>Answer</InputGroup.Addon>
                <FormControl onKeyPress={this.handleKeyPress} type="text" />
            </InputGroup>
            </AnswerDiv>
        }
    }
    getMainModal() {
        return <Div className="index">
            < Navbar />
            <Test>
                <QueryHistoryModel>
                    <PanelGroup accordion>
                        <SurveyNameModel>
                            {this.props.surveyName}
                        </SurveyNameModel>
                        {this.generateQueryHistry()}
                    </PanelGroup>
                </QueryHistoryModel>
                <QueryModel>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>Query</InputGroup.Addon>
                            <FormControl onKeyPress={this.handleKeyPress} type="text" />
                        </InputGroup>
                        {this.generateQuestion()}
                    </FormGroup>
                </QueryModel>
            </Test>
        </Div>
    }

    render() {
        return (
            this.getMainModal()
        )
    }
}

export default withRouter(AppComponent);
