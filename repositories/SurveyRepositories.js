const knex = require('./connect');

class SurveyRepositories {

    /**
     * @param {string} name
     * @param {date} endDate
     * @param {integer} userId
     * @return Promise.<integer> surveyId
     */
    static createSurver(name, endDate, userId) {
        return knex('survey')
            .returning('id')
            .insert({
                name,
                endDate,
                userId,
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

}

module.exports = SurveyRepositories;
