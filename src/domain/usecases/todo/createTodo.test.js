const { NotFoundError } = require('../../errors');
const NotValidError = require('../../errors/notValid');
const createTodoUseCase = require('./createTodo');

describe('Create Todo', () => {
  it('should create todo', async () => {
    try {
      const todo = {
        userId: 1,
        description: 'Buy apples',
      };
      const request = {
        ...todo,
      };
      const todoRepository = {
        async insert() {
          return {
            ...todo,
            id: 1,
          };
        },
      };
      const userRepository = {
        async findByID() {
          return [{}];
        },
      };
      const usecase = createTodoUseCase({ todoRepository, userRepository })();

      await usecase.authorize({});
      const response = await usecase.run(request);

      expect(response).toBe({
        ...todo,
        id: 1,
      });
    } catch (error) {}
  });

  it('should not create invalid todo', async () => {
    try {
      const todoRepository = {};
      const userRepository = {};

      const request = { userId: 1, description: 100 };
      const usecase = createTodoUseCase({ todoRepository, userRepository })();

      await usecase.authorize({});

      const response = await usecase.run(request);

      expect(response).toStrictEqual(
        NotValidError('Todo ', 'The Todo entity is invalid', {
          description: [
            {
              wrongType: String,
            },
          ],
        })
      );
    } catch (error) {}
  });

  it('should not create todo with invalid user', async () => {
    try {
      const todoRepository = {};
      const userRepository = {
        async findByID() {
          return [];
        },
      };

      const request = { userId: 1, description: 'Buy apples' };
      const usecase = createTodoUseCase({ todoRepository, userRepository })();

      await usecase.authorize({});
      const response = await usecase.run(request);

      expect(response).toStrictEqual(
        NotFoundError('User', `User entity not found by id: ${request.userId}`)
      );
    } catch (error) {}
  });
});
