import * as Joi from '@hapi/joi';

export function checkOptions<T>(obj: T) {
  const schema = Joi.object().keys({
    year: Joi.number().min(2000).required().messages({
      'number.base': `"year" should be a type of 'number'`,
      'number.min': `"year" should have a minimum length of {#limit}`,
      'any.required': `"year" is a requied field`
    }),
    month: Joi.number().min(1).max(12).required().messages({
      'number.base': `"month" should be a type of 'number'`,
      'number.min': `"month" should have a maximum length of {#limit}`,
      'number.max': `"month" should have a minimum length of {#limit}`,
      'any.required': `"month" is a requied field`
    }),
    // date: Joi.number().min(1).max(32).messages({
    //   'number.base': `"date" should be a type of 'number'`,
    //   'number.min': `"date" should have a maximum length of {#limit}`,
    //   'number.max': `"date" should have a minimum length of {#limit}`,
    // }),
    // disableAllergyInfo: Joi.boolean().default(false).messages({
    //   'boolean.base': `"disableAllergyInfo" should ba a type of 'boolean'`,
    // }),
  });

  const { error, value } = schema.validate(obj);

  return [error, value] as [typeof error, T];
}

