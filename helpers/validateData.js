import Joi from 'joi';

export function validateData(data) {
  const schema = Joi.object({
    fileName: Joi.string().required(),
    content: Joi.string().required(),
  });
  return schema.validate(data);
}
