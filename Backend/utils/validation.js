const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const todoSchema = Joi.object({
  user_id: Joi.number().required(),
  time: Joi.string().required(),
  text: Joi.string().required(),
  checked: Joi.boolean().required(),
});

const createTodoSchema = Joi.object({
  text: Joi.string().required(),
  time: Joi.string().required(),
  priority: Joi.string().valid('Low', 'Medium', 'High').required(),
  category: Joi.string().valid('Work', 'Study', 'Personal', 'Health').required()
})

const checkedTodoSchema = Joi.object({
  checked: Joi.boolean().required(),
});

module.exports = {
  userSchema,
  todoSchema,
  createTodoSchema,
  checkedTodoSchema
};