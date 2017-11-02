'use strict'

const SurveyService = require('service/SurveyService');

class StatisticService {

    getSurveyStatistic(surveyId) {
        return SurveyService.getSurveysQuestionWithAnswers(surveyId)
            .then((queries) => {

            })

    }
}