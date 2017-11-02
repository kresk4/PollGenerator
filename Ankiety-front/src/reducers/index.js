'use strict';

import {combineReducers} from 'redux';

import user from './user';
import survey from './survey';

export default combineReducers({
    user,
    survey,
});
