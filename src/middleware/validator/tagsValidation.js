const Joi = require('joi');

const validator = (schema) => async (payload) => {
  const value = await schema.validateAsync(payload);
  return value;
};


const createTagsSchema = Joi.object({
    title: Joi.string().max(50).required(),
    slug: Joi.string().max(150).required(),
    description: Joi.string().max(200),
  });
  
  const updateTagsSchema = Joi.object({
    id: Joi.string().max(30).required(),
    title: Joi.string().max(50).required(),
    slug: Joi.string().max(150).required(),
    description: Joi.string().max(200),
  });
  
  const deleteTagsSchema = Joi.object({
    id: Joi.string().max(30).required(),
  });

  validateCreateTags = validator(createTagsSchema);
validateUpdateTags = validator(updateTagsSchema);
validateDeleteTags = validator(deleteTagsSchema);

module.exports ={
    validateCreateTags,
    validateUpdateTags,
    validateDeleteTags,
}