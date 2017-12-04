import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import CenterModal from '../CenterModal'
import {Alert} from 'react-bootstrap';
import api from '../../api.js';
import Answer from './Answer';
import Button from '../Button';

const Test = styled(CenterModal)`
    height: 75%;
    width: 75%;
    overflow: scroll;
`

class Answers extends React.Component {

    constructor() {
        super();
        this.state = {
            survey: [],
            answers: [],
            disabled: true,
        }
    }

    componentDidMount() {
        return api.getSurvey(this.props.match.params.id)
            .then((newSurvey) => {
                this.setState({
                    ...this.state,
                    survey: newSurvey.queries,
                    success: false,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    generateAnswers() {
        if(!this.state.success) {
            return this.state.survey.map((query, i) => {
                return <Answer id={i} query={query} saveAnswer={::this.saveAnswer}/>
            });
        }
        return <Alert bsStyle="success">
            <strong>Answers sended</strong>
        </Alert>
    }

    saveAnswer(queryId, answerId) {
        const answer = this.state.answers.filter((answer) => {
            return answer.queryId !== queryId
        });
        answer.push({queryId, answerId});
        this.setState({
            ...this.state,
            answers: answer,
            disabled: !(this.state.answers.length+1 === this.state.survey.length || this.state.answers.length === this.state.survey.length)
        })
    }

    sendAnswers() {
        if(this.state.answers.length !== 0 && this.state.answers.length === this.state.survey.length) {
            return api.sendAnswers(this.props.match.params.id, this.state.answers).then(() => {
                this.setState({
                    ...this.state,
                    success: true
                })
            })
        }
    }

    generateButton() {
        if(!this.state.success) {
            return <Button onClick={::this.sendAnswers} disabled={this.state.disabled}>Send</Button>
        }
        return <Button onClick={() => this.props.history.push("/")}>Back to main</Button>
    }

    render() {
        return (
            <Test>
                {::this.generateAnswers()}
                {::this.generateButton()}
            </Test>
        );
    }
}

export default Answers;
