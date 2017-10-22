const knex = require('./connect');
const zipWith = require('lodash.zipwith')

class QueryRepositories {

    static addSurveyIdInQueries(queries, surveyId) {
        return queries.map((query) => {
            return {
                query: query.query,
                surveyId,
            };
        });
    }

    /**
     * @param {string} name
     * @param {date} endDate
     * @param {integer} userId
     * @return Promise.<integer> surveyId
     */
    static createQueries(queries, surveyId) {
        const queriesRow = QueryRepositories.addSurveyIdInQueries(queries, surveyId);
        return knex('query')
            .returning('id')
            .insert(queriesRow)
            .then((ids) => {
                const a = zipWith(queries, ids, (query, id) => {
                    return Object.assign(query, {id});
                })
                return a
            })
    }

    static getQueriesFromSurvey(surveyId) {
        return knex('query')
            .returning('*')
            .where({
                surveyId,
            })
    }
}

module.exports = QueryRepositories;
