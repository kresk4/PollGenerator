const bcrypt = require('bcrypt-then');
const saltRounds = 10;

function generateHash(password) {
    return bcrypt.hash(password, saltRounds)
}

function checkHash(password, hash) {
    return bcrypt.compare(password, hash)
}
module.exports = {generateHash, checkHash};
