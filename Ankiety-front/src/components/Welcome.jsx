import React from 'react';
import {connect} from 'react-redux';
import Hello from './Hello'
import CenterModal from './CenterModal'

@connect((state) => state.user)
class Welcome extends React.Component {

    constructor() {
        super();
    }

    getActiveModal() {
       return activeModal[this.props.activeWindow]
    }

    render() {
        return (
            <CenterModal>
               < Hello />
            </CenterModal>
        );
    }
}

export default Welcome;
