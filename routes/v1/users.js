const validation = require('express-validation');
const Joi = require('joi');
const UserServices = require('service/UserService');

module.exports = (router) => {
    /**
     * @swagger
     * /v1/users:
     *   post:
     *     tags:
     *       - User
     *     summary: Create user
     *     parameters:
     *       - name: data
     *         description: User login and password
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/CreateUser'
     *     responses:
     *       400:
     *         $ref: '#/responses/400'
     *       204:
     *         description: success
     */
    router.post('/users', validation({
        body: {
            login: Joi.string().required(),
            password: Joi.string().required(),
        },
    }), (req, res) => {
        UserServices.createUser(req.body)
            .then(() => res.sendStatus(201))
            .catch((err) => {
                return res.status(401).json({err})
            })
    });

    /**
     * @swagger
     * /v1/users/login:
     *   post:
     *     tags:
     *       - User
     *     summary: Login user
     *     parameters:
     *       - name: data
     *         description: User login and password
     *         in: body
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/CreateUser'
     *     responses:
     *       400:
     *         $ref: '#/responses/400'
     *       204:
     *         description: success
     */
    router.post('/users/login', validation({
        body: {
            login: Joi.string().required(),
            password: Joi.string().required(),
        },
    }), (req, res) => {
        return UserServices.loginUser(req.body)
            .then((token) => {
                res.cookie('token', token, {
                    maxAge: 900000,
                    secure: false,
                    httpOnly: true,
                });
                res.sendStatus(200)
            })
            .catch((err) => res.status(401).json(err))
    });

    /**
     * @swagger
     * /v1/users/logout:
     *   delete:
     *     tags:
     *       - User
     *     summary: logout user
     *     responses:
     *       400:
     *         $ref: '#/responses/400'
     *       204:
     *         description: success
     */
    router.delete('/users/logout', (req, res) => {
        if(!req.cookies.token) {
            res.status(500).json('cookies not found')
        }
        res.clearCookie('token');
        res.sendStatus(200);
    });
};
