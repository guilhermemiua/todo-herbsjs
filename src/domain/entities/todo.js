const { entity, field } = require('@herbsjs/herbs');

const Todo = entity('Todo', {
  id: field(Number),
  description: field(String, {
    presence: true,
  }),
  isFinished: field(Boolean, {
    default: false,
  }),
});

module.exports = Todo;
