const SurveyRepositories = require('repositories/SurveyRepositories');
const QueryRepositories = require('repositories/QueryRepositories');
const AnswerRepositories = require('repositories/AnswerRepositories');

class SurveyService {

    /**
     * @param {string} name
     * @param {string} endDate
     * @return Promise.<>
     */
    static createSurvey({name, endDate, queries}, userId) {
        let surveyId
        return SurveyRepositories.createSurver(name, endDate, userId)
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
}

module.exports = SurveyService;
