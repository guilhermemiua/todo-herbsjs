async function factory(conn) {
  return {
    userRepository: await new (require('./userRepository'))(conn),
  };
}
module.exports = factory;
