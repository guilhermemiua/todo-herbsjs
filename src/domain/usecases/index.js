module.exports = [
  {
    usecase: require('./user/createUser'),
    tags: { group: 'Users', type: 'mutation' },
  },
  {
    usecase: require('./user/updateUser'),
    tags: { group: 'Users', type: 'mutation' },
  },
  {
    usecase: require('./user/deleteUser'),
    tags: { group: 'Users', type: 'mutation' },
  },
  {
    usecase: require('./user/findOneUser'),
    tags: { group: 'Users', type: 'query' },
  },
];
