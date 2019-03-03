const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator/check');
const UsersController = require('../../controllers/users');

router.get('/:id?', [
    check('id')
        .optional()
        .isMongoId()
            .withMessage('ID must be a valid mongo id')
], (req, res) => !validationResult(req).isEmpty() ? 
                    res.status(400).json(validationResult(req).array()) : 
                    UsersController.get(req, res));

router.post('/', [
    body('name')
        .isAlphanumeric()
            .withMessage('Name is required')
        .isLength({ min: 2})
            .withMessage('Name must be at least 2 characters'),

    body('email')
        .isLength({ min: 1})
            .withMessage('Email is required')
        .isEmail()
            .withMessage('Email must be a valid email address'),

    body('password')
        .isLength({ min: 8, })
        .matches('[0-9]')
        .matches('[a-z]')
        .matches('[A-Z]')
], (req, res) => !validationResult(req).isEmpty() ? 
                    res.status(400).json(req.body) :
                    UsersController.post(req, res));

router.delete('/:id', [
    check('id')
        .isMongoId()
        .withMessage('ID must be a valid mongo id')
], (req, res) => !validationResult(req).isEmpty() ?
                res.status(400).json(validationResult(req).array()) :
                UsersController.delete(req, res));

router.patch('/:id', [], (req, res) => UsersController.patch(req, res));

module.exports = router;