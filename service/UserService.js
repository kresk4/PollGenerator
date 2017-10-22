const usersRepositories = require('repositories/UsersRepositories');
const randomstring = require('randomstring');

class UserService {

    /**
     * @param {string} login
     * @param {string} password
     * @return Promise.<>
     */
    static createUser({login, password}) {
        return usersRepositories.getUserByLoginAndPassword(login, password)
            .then((result) => {
                if(!!result.length){
                    throw new Error('User exist')
                }
                return usersRepositories.createUser(login, password)
            })
    }

    /**
     * @param {string} login
     * @param {string} password
     * @return Promise.<String> token
     */
    static loginUser({login, password}) {
        return usersRepositories.getUserByLoginAndPassword(login, password)
            .then((result) => {
                if(!result.length) {
                    throw new Error('Wrong password or login')
                }
                const newToken = randomstring.generate(20);
                return usersRepositories.saveToken(login, password, newToken)
                    .then(() => newToken);
            })
    }

    /**
     * @param {token} token
     * @return Promise.<integer> userId
     */
    static getUserIdByToken(token) {
        return usersRepositories.getUserByToken(token)
            .then((user) => {
                if(!user.length) {
                    throw new Error('Wrong token')
                }
                return user[0].id
            })
    }
}

module.exports = UserService;
