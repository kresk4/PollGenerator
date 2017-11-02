const knex = require('./connect');

class SurveyRepositories {

    /**
     * @param {string} name
     * @param {date} endDate
     * @param {integer} userId
     * @return Promise.<integer> surveyId
     */
    static createSurver(name, endDate, countOfAnswers, userId) {
        return knex('survey')
            .returning('id')
            .insert({
                name,
                endDate,
                userId,
                countOfAnswers,
            })
            .then(res => res[0]);
    }

    /**
     * @param {integer} userId
     * @return Promise.<Survey> surveys
     */
    static getUserSurveysByUserId(userId) {
        return knex('survey')
            .returning('*')
            .where({userId})
    }

    /**
     *
     * @param surveyId
     * @returns {*}
     */
    static getSurvey(surveyId) {
        return knex('survey')
            .returning('*')
            .where({id: surveyId})
    }

    /**
     *
     * @param surveyId
     * @returns {*}
     */
    static decrementSurveyCountOfAnswers(surveyId) {
        return knex('survey')
            .returning('*')
            .where({id: surveyId})
            .decrement('countOfAnswers', 1);
    }

}

module.exports = SurveyRepositories;
