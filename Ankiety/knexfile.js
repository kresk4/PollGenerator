'use strict'

const {connect} = require('./config/main.js')

module.exports = {
    client: 'pg',
    connection: connect,
    migrations: {
        directory: __dirname + '/migrations',
        tableName: 'version'
    }
}
