const { entity, field } = require('@herbsjs/herbs');
const Todo = require('./todo');

const User = entity('User', {
  id: field(Number),
  nickname: field(String),
  password: field(String, {
    validation: { presence: true, length: { minimum: 6 } },
  }),
  todos: field([Todo], {
    default: () => [],
  }),
  totalTodos() {
    return this.todos.length();
  },
});

module.exports = User;
