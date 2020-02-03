import { check, validationResult, param } from 'express-validator';
 
const validate = {
  fixture: [
    check('homeTeam')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Home Team is required')
      .isLength({ min: 1, max: 40 })
      .withMessage('Home Team must be between 1 to 40 charaters long'),
    check('awayTeam')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Away Team is required')
      .isLength({ min: 1, max: 40 })
      .withMessage('Away Team must be between 1 to 40 charaters long')
      .custom((value, { req }) => {
        if (value === req.body.homeTeam) {
          return false;
        }
        return value;
      })
      .withMessage('Home and Away Teams have to be different'),
    check('stadium')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Stadium is required')
      .isLength({ min: 1, max: 50 })
      .withMessage('Stadium must be between 1 to 50 charaters long'),
    check('city')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('City is required')
      .isLength({ min: 1, max: 50 })
      .withMessage('City must be between 1 to 50 charaters long'),
    check('country')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Country is required')
      .isLength({ min: 1, max: 50 })
      .withMessage('Country must be between 1 to 50 charaters long'),
    check('referee')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Referee is required')
      .isLength({ min: 1, max: 50 })
      .withMessage('referee must be between 1 to 50 charaters long'),
    check('happeningOn')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('happeningOn is required')
      .matches((/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}[T][0-9]{2}\:[0-9]{2}$/))
      .withMessage('happeningOn must follow YYYY-MM-DDTHH:MM format'),
    check('idempotencyKey')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('idempotencyKey is required')
      .trim()
      .isUUID()
      .withMessage('Idempotency key must be a valid UUID'),
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
  editFixture: [
    check('homeTeam')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Home Team is required')
      .isLength({ min: 1, max: 40 })
      .withMessage('Home Team must be between 1 to 40 charaters long'),
    check('awayTeam')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Away Team is required')
      .isLength({ min: 1, max: 40 })
      .withMessage('Away Team must be between 1 to 40 charaters long')
      .custom((value, { req }) => {
        if (value === req.body.homeTeam) {
          return false;
        }
        return value;
      })
      .withMessage('Home and Away Teams have to be different'),
    check('stadium')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Stadium is required')
      .isLength({ min: 1, max: 50 })
      .withMessage('Stadium must be between 1 to 50 charaters long'),
    check('city')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('City is required')
      .isLength({ min: 1, max: 50 })
      .withMessage('City must be between 1 to 50 charaters long'),
    check('country')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Country is required')
      .isLength({ min: 1, max: 50 })
      .withMessage('Country must be between 1 to 50 charaters long'),
    check('referee')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Referee is required')
      .isLength({ min: 1, max: 50 })
      .withMessage('referee must be between 1 to 50 charaters long'),
    check('happeningOn')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('happeningOn is required')
      .matches((/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}[T][0-9]{2}\:[0-9]{2}$/))
      .withMessage('happeningOn must follow YYYY-MM-DDTHH:MM format'),
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
  validateId: [
    param('id')
      .matches((/^[0-9a-f]{24}$/))
      .withMessage('id is not valid'),
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