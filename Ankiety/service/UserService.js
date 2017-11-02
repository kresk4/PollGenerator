const usersRepositories = require('repositories/UsersRepositories');
const randomstring = require('randomstring');
const hashGenerator = require('components/HashGenerator');

class UserService {

    /**
     * @param {string} login
     * @param {string} password
     * @return Promise.<>
     */
    static createUser({login, password}) {
        return usersRepositories.chceckLoginExist(login)
            .then((result) => {
                if(!!result){
                    throw new Error('User exist')
                }
                return hashGenerator.generateHash(password)
                    .then((hash) => {
                        return usersRepositories.createUser(login, hash)
                    })
            })
    }

    /**
     * @param {string} login
     * @param {string} password
     * @return Promise.<String> token
     */
    static loginUser({login, password}) {
        return usersRepositories.getHash(login)
            .then((userData) => hashGenerator.checkHash(password, userData.password)
                    .then((result) => {
                        if(!result) {
                            throw new Error('Wrong password')
                        }
                        const newToken = randomstring.generate(20);
                        return usersRepositories.saveToken(login, newToken)
                            .then(() => newToken);
                    })

            )
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

    static getUserDetails(userId) {
        return usersRepositories.getUserDetails(userId)
    }
}

module.exports = UserService;
