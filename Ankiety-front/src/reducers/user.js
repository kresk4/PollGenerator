'use strict';

export default function reducer(state = {
    login: '',
    activeWindow: 'HELLO',
    logged: false,
}, action) {
    switch (action.type) {
        case 'CHANGE_ACTIVE_WINDOW' : {
            return {
                ...state,
                activeWindow: action.payload
            }
        }

        case 'CHANGE_LOGGED_STATUS': {
            return {
                ...state,
                logged: action.payload,
            }
        }

        case 'SET_LOGIN': {
            return {
                ...state,
                login: action.payload,
            }
        }
    }

    return state;
};
