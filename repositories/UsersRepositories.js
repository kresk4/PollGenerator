const knex = require('./connect');

class PermissionsRepository {

    /**
     * @param {string} login
     * @param {string} password
     * @return Promise.<String> token
     */
    static createUser(login, password) {
        return knex('users')
            .returning('*')
            .insert({
                login,
                password,
            });
    }

    /**
     * @param {string} login
     * @param {string} password
     * @return Promise.<String> token
     */
    static getUserByLoginAndPassword(login, password) {
        return knex('users').select('*').where({login, password});
    }

    /**
     * @param {string} token
     * @return Promise.<User> user
     */
    static getUserByToken(token) {
        return knex('users').select('*').where({token}).limit(1);
    }

    /**
     * @param {string} login
     * @param {string} password
     * @return Promise.<String> token
     */
    static saveToken(login, password, token) {
        return knex('users').where({login, password}).update({token});
    }
}

module.exports = PermissionsRepository;
