const { entity2input } = require('@herbsjs/herbs2gql');
const entities = require('../../../domain/entities');

const inputs = [].concat(
  Object.keys(entities).map((entity) => [entity2input(entities[entity])])
);

module.exports = inputs;
