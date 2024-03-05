const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const teamSchema = Joi.object({
  Team_Name: Joi.string().required(),
  Rep_City: Joi.string().required(),
  Conference: Joi.string().required(),
});

exports.validateTeam = validator(teamSchema);
