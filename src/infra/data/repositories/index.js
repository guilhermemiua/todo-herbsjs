async function factory(conn) {
  return {
    userRepository: await new (require('./userRepository'))(conn),
    todoRepository: await new (require('./todoRepository'))(conn),
  };
}
module.exports = factory;
