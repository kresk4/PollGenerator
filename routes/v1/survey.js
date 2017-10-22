const validation = require('express-validation');
const Joi = require('joi');
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
            countOfAnswers: Joi.number().integer(),
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
            return res.status(401).json({error: err.message})
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
            return res.status(401).json({error: err.message})
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
    router.get('/query/:surveyId', (req, res) => {
        return SurveyService.getSurveysQuestionWithAnswers(req.params.surveyId)
            .then((queries) => {
                res.status(201).json({queries})
            })
            .catch((err) => {
                return res.status(401).json({error: err.message})
            })
    });

    /**
     * @swagger
     * /v1/answers/{surveyId}:
     *   post:
     *     tags:
     *       - Survey
     *     summary: post answers from survey
     *     parameters:
     *       - name: surveyId
     *         description: survey id
     *         in: path
     *         required: true
     *         type: integer
     *       - name: answers
     *         description: answers
     *         in: body
     *         required: true
     *         type: object
     *         schema:
     *           $ref: '#/definitions/Answers'
     *     responses:
     *       400:
     *         $ref: '#/responses/400'
     *       204:
     *         description: success
     */
    router.post('/answers/:surveyId', (req, res) => {
        return SurveyService.postAnswerToSurvey(req.params.surveyId, req.body)
            .then(() => {
                return res.sendStatus(204)
            })
            .catch((err) => {
                return res.status(401).json({error: err.message})
            })
    });
};
