import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    width: 100%;
    height: 5%;
    padding: 10px 0;
    font-size: 25px;
    border: 1px solid;
    border-color: ${props => props.isActive ? 'white' : '#242536'};
    border-radius: 15px;
    font-weight: bold;
    color: ${props => props.isActive ? 'white' : '#242536'};
    cursor:pointer;
    @media screen and (max-width: 768px) {
       font-size: 14px;
    }
    overflow: scroll;
    margin-top: 5px;
    float: left;
`

const QuestionNumber = styled.div`
  width:6%;
  border-radius:50%;
  text-align:center;
  font-size: 12px;
  padding:3% 0;
  line-height:0;
  position:relative;
  color: ${props => props.isActive ? '#242536' : 'white'};
  background: ${props => props.isActive ? 'white' : '#242536'};
  float: left;
  margin-left: 5px;
`

const Answers = styled.div`
    width 100%;
    height: 25%;
    padding: 5px 0;
    overflow: scroll;
    color: ${props => props.id === props.chosenId ? 'green' : '#242536'};
    cursor:pointer;
    font-size: 20px;
    @media screen and (max-width: 768px) {
       font-size: 14px;
    }
    &:hover {
        color: white;
    }
    margin: 5px 0;
    border-bottom: 1px solid; 
    border-color: ${props => props.id === props.chosenId ? 'green' : '#242536'};
`

class Answer extends React.Component {
    constructor() {
        super()
        this.state = {
            showAnswers: false,
            chosenId: null,
        }
    }

    showAnswer() {
        this.setState({
            ...this.setState,
            showAnswers: !this.state.showAnswers
        })
    }

    generateAnswer() {
        if(this.state.showAnswers) {
            return this.props.query.answers.map((an) => {
                return <Answers id={an.id} onClick={() => this.saveAnswer(this.props.query.id, an.id)} chosenId={this.state.chosenId}>
                    {an.answer}
                </Answers>
            })
        }
        return null
    }

    saveAnswer(queryId, answerId) {
        this.setState({
            ...this.state,
            chosenId: answerId,
        })
        return this.props.saveAnswer(queryId, answerId)
    }

    render() {
        return (
            <div>
                <Div onClick ={::this.showAnswer} isActive={false}>
                    <QuestionNumber>
                        {this.props.id}
                    </QuestionNumber>
                    {this.props.query.query}
                </Div>
                {::this.generateAnswer()}
            </div>
        );
    }
}

export default Answer;
