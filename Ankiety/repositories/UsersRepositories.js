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

    static chceckLoginExist(login) {
        return knex('users')
            .select('*')
            .where({login})
            .then((res) => res.length);
    }

    /**
     * @param {string} login
     * @param {string} password
     * @return Promise.<String> token
     */
    static getUserByLoginAndPassword(login, password) {
        return knex('users').select('*').where({login, password});
    }

    static getHash(login) {
        return knex('users').select('*').where({login}).then((res) => res[0]);
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
    static saveToken(login, token) {
        return knex('users').where({login}).update({token});
    }

    static getUserDetails(userId) {
        return knex('users').select('login').where({id: userId}).then((res) => res[0]);
    }
}

module.exports = PermissionsRepository;
