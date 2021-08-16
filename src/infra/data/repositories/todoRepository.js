const { Repository } = require('@herbsjs/herbs2knex');
const { Todo } = require('../../../domain/entities');

module.exports = class TodoRepository extends Repository {
  constructor(connection) {
    super({
      entity: Todo,
      table: 'todos',
      ids: ['id'],
      foreignKeys: [{ userId: Number }],
      knex: connection,
    });
  }

  async deleteByID(id) {
    const ret = await this.runner.where('id', id).delete();

    return ret === 1;
  }
};
