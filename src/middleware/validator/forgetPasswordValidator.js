const Joi = require('joi');

const validator = (schema) => async (payload) => {
    const value = await schema.validateAsync(payload);
    return value;
  };

const emailValidatorSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }).required(),
})

validateEmail = validator(emailValidatorSchema)

module.exports = validateEmail