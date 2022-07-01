const { check } = require('express-validator');
module.exports = [
    check('first_name').isString(),
    check('first_name').isLength({ max: 20 }).withMessage('first name must be less then 20 characters'),
    check('last_name').isString(),
    check('last_name').isLength({ max: 20 }).withMessage('last name must be less then 20 characters'),
    check('phone_number').isString(),
    check('phone_number').isLength({ max: 20 }).withMessage('phone number must be less then 20 characters'),
    check('age').isNumeric().withMessage('age requireds a numeric value'),
    check('sex').isLength({ min: 0, max: 1}).withMessage('sex must be 0 or 1'),
    check('location').isString(),
    check('location').isLength({ max: 100 }).withMessage('location field must be less then 30 characters'),
    check('email').isEmail().withMessage('invalid email format'),
    check('password').isLength({ min: 5 }).withMessage('password field must be more than 5 and less than 16 characters'),
    check('confirm_password').isLength({ min: 5 }).withMessage('confirm password field must be more than 5 and less than 16 characters')
]