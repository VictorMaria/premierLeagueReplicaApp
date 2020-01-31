import { check, validationResult } from 'express-validator';
 
const validate = {
  signUp: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email is required')
      .isEmail()
      .trim()
      .withMessage('Please input a valid email address'),
    check('firstName')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('First name is required')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('First name must be between 3 to 15 characters')
      .matches((/[a-z]+[-']{0,1}[a-z]+$/))
      .withMessage('First name can only contain letters'),
    check('lastName')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Last name is required')
      .trim()
      .isLength({ min: 3, max: 15 })
      .withMessage('Last name must be between 3 to 15 characters')
      .matches((/[a-z]+[-']{0,1}[a-z]+$/))
      .withMessage('Last name can only contain letters'),
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password is required')
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/, 'i')
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter and one numeric digit')
      .trim()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          return false;
        }
        return value;
      })
      .withMessage('Passwords don\'t match'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    },
  ],
  signIn: [
    check('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email is required')
      .isEmail()
      .trim()
      .withMessage('Please input a valid email address'),
    check('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password is required'),
    (req, res, next) => {
      const errors = validationResult(req);
      const errorMessage = {};
      if (!errors.isEmpty()) {
        errors.array({ onlyFirstError: true }).forEach((error) => {
          errorMessage[error.param] = error.msg;
        });
        return res.status(400).json({
          errors: errorMessage,
        });
      }
      return next();
    },
  ],
};

export default validate;