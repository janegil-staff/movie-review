const { check, validationResult } = require("express-validator");

exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is misssing!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is misssing!")
    .isLength({ min: 8, max: 20 }).withMessage("Password must be 8 to 20 chars")
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if(error.length) {
    return res.json({error: error[0].msg});
  }

  next();
}