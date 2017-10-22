const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const validator = require('express-validation');
const cookieParser = require('cookie-parser')

require('app-module-path').addPath(__dirname);

const routes = require('routes/v1');
const {port} = require('config/main')
const app = express();
app.disable('x-powered-by');

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    switch (error.code) {
        case 'EACCES':
            throw new Error('Port listen requires elevated privileges');

        case 'EADDRINUSE':
            throw new Error('Port is already in use');

        default:
            throw error;
    }
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(cookieParser());
validator.options({
    allowUnknownBody: false,
    allowUnknownHeaders: false,
    allowUnknownQuery: false,
    allowUnknownParams: false,
    allowUnknownCookies: false,
});

app.use('/v1', routes);

app.get('/swagger.json', (req, res) => {
    const options = {
        swaggerDefinition: {
            info: {
                title: 'Survey Service',
                version: '1.0.0',
            },
        },
        apis: ['./routes/v1/*'],
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerJSDoc(options));
});

app.get('/', (req, res) => {
    res.json('OK - Survey Service, works');
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next(err);
        return;
    }

    if (err instanceof validator.ValidationError) {
        return res.status(err.status).json(err);
    }

    res.status(err.status || 500);
    res.json({
        msg: err.message,
    });
});

module.exports = app;
