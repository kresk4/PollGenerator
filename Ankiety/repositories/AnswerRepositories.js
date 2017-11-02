const knex = require('./connect');

class AnswerRepositories {

    /**
     *
     * @param queries
     * @returns {Array|external:Promise.<Array>|Promise<pgPromise.IArrayExt<any>>}
     */
    static generateAnswersObjects(queries) {
        return queries.map((query) => {
            return query.answers.map((answer) => {
                return {
                    answer: answer.answer,
                    queryId: query.id,
                    answerCount: 0,
                }
            })
        })
    }

    /**
     * @param {string} name
     * @param {date} endDate
     * @param {integer} userId
     * @return Promise.<integer> surveyId
     */
    static createAnswer(queries) {
        const answersRows = AnswerRepositories.generateAnswersObjects(queries);
        return Promise.all(answersRows.map((row) => {
            return knex('answer')
                .returning('*')
                .insert(row)
        }))

    }

    /**
     *
     * @param queryId
     * @returns {*}
     */
    static getAnswersFromQuestion(queryId) {
        return knex('answer')
            .returning('*')
            .where({
                queryId,
            })
    }

    /**
     *
     * @param answers
     * @returns {Promise.<*[]>}
     */
    static postAnswers(answers) {
        return Promise.all(answers.map((answer) => {
            return knex('answer')
                .where({
                    id: answer.answerId,
                    queryId: answer.queryId
                })
                .increment('answerCount', 1)
        }))
    }
}

module.exports = AnswerRepositories;
