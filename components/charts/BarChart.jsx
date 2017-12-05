import React from 'react';
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from 'recharts';
import flattendepth from 'lodash.flattendepth';
import uniq from 'lodash.uniq';

class ChartBar extends React.Component {

    constructor() {
        super();
        this.state = {
            queries: null,
            loaded: false,
        }
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            queries: this.props.surveyData.queries.map((query) => {
                return {
                    ...query.answers.reduce((answers, answer) => ({...answers, [answer.answer]: answer.answerCount}), {}),
                    name: query.query,
                }
            }),
            loaded: true,
        })
    }

    generateBar() {
        const keys = uniq(flattendepth(this.state.queries.map((query) => Object.keys(query)))).filter((key) => key !== 'name');
        return keys.map((key) => (
            <Bar dataKey={key} stackId='a' fill={'#'+Math.random().toString(16).slice(-6)} />
        ))
    }


    getChart() {
        if(this.state.loaded) {
            return <BarChart width={(this.state.queries || {}).length*120} height={this.props.height-50} data={this.state.queries}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {this.generateBar()}
            </BarChart>
        }
        return null;
    }


    render() {
        return (
            this.getChart()
        );
    }
}

export default ChartBar;
