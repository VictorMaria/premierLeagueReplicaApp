import { check, validationResult, param } from 'express-validator';
 
const validate = {
  newTeam: [
    check('teamName')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Team Name is required')
      .isLength({ min: 1, max: 100 })
      .withMessage('Team Name must be between 1 to 100 charaters long'),
    check('manager')
      .not()
      .trim()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Manager is required'),
      check('stadium')
      .not()
      .trim()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Stadium is required'),
      check('website')
      .not()
      .trim()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Website is required'),
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
  editTeam: [
    check('teamName')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .trim()
      .withMessage('Team Name is required')
      .isLength({ min: 1, max: 100 })
      .withMessage('Team Name must be between 1 to 100 charaters long'),
    check('manager')
      .not()
      .trim()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Manager is required'),
      check('stadium')
      .not()
      .trim()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Stadium is required'),
      check('website')
      .not()
      .trim()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Website is required'),
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