const { usecase, step, Ok } = require('@herbsjs/herbs');
const { Todo } = require('../../entities');
const { NotValidError } = require('../../errors');
const NotFoundError = require('../../errors/notFound');

const useCase =
  ({ todoRepository, userRepository }) =>
  () =>
    usecase('Create Todo', {
      // Input/Request metadata and validation
      request: {
        userId: Number,
        description: String,
      },

      // Output/Response metadata
      response: Todo,

      // Authorization with Audit
      // authorize: user => (user.canCreateTodo ? Ok() : Err()),
      authorize: (user) => Ok(user),

      // Step description and function
      'Check if the Todo is valid': step((ctx) => {
        ctx.todo = Todo.fromJSON(ctx.req, {
          allowExtraKeys: true,
        });

        if (!ctx.todo.isValid())
          return NotValidError(
            'Todo ',
            'The Todo entity is invalid',
            ctx.todo.errors
          );
        // returning Ok continues to the next step. Err stops the use case execution.
        return Ok();
      }),

      'Check if User exists': step(async (ctx) => {
        const { userId } = ctx.req;

        const [user] = await userRepository.findByID(userId);

        if (!user)
          return NotFoundError(
            'User',
            `User entity not found by id: ${userId}`
          );
        // returning Ok continues to the next step. Err stops the use case execution.
        return Ok();
      }),

      'Save the Todo': step(
        async (ctx) =>
          // ctx.ret is the Use Case return
          (ctx.ret = await todoRepository.insert(ctx.todo))
      ),
    });

module.exports = useCase;
