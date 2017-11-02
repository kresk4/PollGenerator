'use strict';

export default function reducer(state = {
    surveys: [],
    surveyName: 'asdasdasdasdasd',
    surveyQuestions: [
        {
            name: 'Pytanie1'
        },
        {
            name: 'Pytanie1'
        },
        {
            name: 'Pytanie1'
        },
    ],
}, action) {
    switch (action.type) {
        case 'SET_SERVEY' : {
            return {
                ...state,
                surveys: action.payload
            }
        }

        case 'SET_SURVEY_NAME': {
            return {
                ...state,
                surveyName: action.payload
            }
        }
    }

    return state;
};
