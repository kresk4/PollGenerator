const SurveyRepositories = require('repositories/SurveyRepositories');
const QueryRepositories = require('repositories/QueryRepositories');
const AnswerRepositories = require('repositories/AnswerRepositories');

class SurveyService {

    /**
     * @param {string} name
     * @param {string} endDate
     * @return Promise.<>
     */
    static createSurvey({name, endDate, countOfAnswers, queries}, userId) {
        let surveyId
        return SurveyRepositories.createSurver(name, endDate, countOfAnswers, userId)
            .then((id) => {
                surveyId = id
                return QueryRepositories.createQueries(queries, id)
            })
            .then((queries) => AnswerRepositories.createAnswer(queries))
        .then(() => surveyId)
    }

    /**
     * @param {integer} userId
     * @return Promise.<>
     */
    static getUserSurveys(userId) {
        return SurveyRepositories.getUserSurveysByUserId(userId)
    }

    static getSurveysQuestionWithAnswers(surveysId) {
        return QueryRepositories.getQueriesFromSurvey(surveysId)
            .then((queries) => {
                return Promise.all(queries.map((query) => {
                    return AnswerRepositories.getAnswersFromQuestion(query.id)
                        .then((answers) => {
                            return Object.assign(query, {answers})
                        })
                }))
            })
    }

    static postAnswerToSurvey(surveyId, answers) {
        return SurveyRepositories.getSurvey(surveyId)
            .then((res) => {
                if(!res.length) {
                    throw new Error('Survey not found')
                }
                if(res[0].countOfAnswers === 0) {
                    throw new Error('This survey is close')
                }
                return AnswerRepositories.postAnswers(answers)
                    .then(() => {
                        return SurveyRepositories.decrementSurveyCountOfAnswers(surveyId)
                    })
            })
    }
}

module.exports = SurveyService;
