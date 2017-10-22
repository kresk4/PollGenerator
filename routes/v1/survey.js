const validation = require('express-validation');
const Joi = require('joi');
const UserServices = require('service/UserService');
const SurveyService = require('service/SurveyService');
const {authorized} = require('components/UserAuthorize');

module.exports = (router) => {
    /**
     * @swagger
     * /v1/survey:
     *   post:
     *     tags:
     *       - Survey
     *     summary: Create survey
     *     parameters:
     *       - name: data
     *         description: survey data
     *         in: body
     *         required: true
     *         type: object
     *         schema:
     *           $ref: '#/definitions/CreateSurvey'
     *     responses:
     *       400:
     *         $ref: '#/responses/400'
     *       204:
     *         description: success
     */
    router.post('/survey', authorized, validation({
        body: {
            name: Joi.string().required(),
            endDate: Joi.date().required(),
            queries: Joi.array().items(Joi.object({
                query: Joi.string().required(),
                answers: Joi.array().items(Joi.object({
                        answer: Joi.string().required(),
                })).required(),
            })).required(),
        }
    }), (req, res) => {
        return SurveyService.createSurvey(req.body, req.userId)
        .then((surveyId) => res.status(201).json({surveyId}))
        .catch((err) => {
            return res.status(401).json({err})
        })
    });

    /**
     * @swagger
     * /v1/survey:
     *   get:
     *     tags:
     *       - Survey
     *     summary: get user serveys
     *     responses:
     *       400:
     *         $ref: '#/responses/400'
     *       204:
     *         description: success
     */
    router.get('/survey', authorized, (req, res) => {
        return SurveyService.getUserSurveys(req.userId)
        .then((surveys) => {
            res.status(201).json(surveys)
        })
        .catch((err) => {
            return res.status(401).json({err})
        })
    });

    /**
     * @swagger
     * /v1/query/{surveyId}:
     *   get:
     *     tags:
     *       - Survey
     *     summary: get user
     *     parameters:
     *       - name: surveyId
     *         description: survey id
     *         in: path
     *         required: true
     *         type: integer
     *     responses:
     *       400:
     *         $ref: '#/responses/400'
     *       204:
     *         description: success
     */
    router.get('/query/:surveyId', authorized, (req, res) => {
        return SurveyService.getSurveysQuestionWithAnswers(req.params.surveyId)
            .then((queries) => {
                res.status(201).json({queries})
            })
            .catch((err) => {
                return res.status(401).json({err})
            })
    });
};
