const { gql } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const {
  ApolloServer,
  addSchemaLevelResolveFunction,
} = require('apollo-server-express');
const types = require('./types');
const inputs = require('./inputs');
const queries = require('./queries');
const mutations = require('./mutations');
const repositoriesFactory = require('../../data/repositories');
const usecases = require('../../../domain/usecases');
const db = require('../../data/database');

async function generateSchema(config) {
  // TODO: rename this "UC"
  const UCqueries = [];
  const UCmutations = [];

  const conn = await db.factory(config);
  const repositories = await repositoriesFactory(conn);
  for (const obj of usecases) {
    if (obj.tags.type === 'query') UCqueries.push(obj.usecase(repositories));
    else UCmutations.push(obj.usecase(repositories));
  }

  const graphQLDef = [].concat(
    types,
    [],
    queries.factory(UCqueries),
    mutations.factory(UCmutations)
  );

  /* Type Defs (Schemas) */
  const typeDefs = graphQLDef.map((i) => gql(i[0]));

  /* Resolvers */
  const resolvers = graphQLDef.map((i) => i[1]).filter((i) => i !== undefined);

  return { typeDefs, resolvers };
}

module.exports = async (app, config) => {
  const schema = makeExecutableSchema(await generateSchema(config));
  addSchemaLevelResolveFunction(schema, () => {});
  return new ApolloServer({
    introspection: true,
    playground: !config.isProd,
    debug: !config.isProd,
    schema,
  }).applyMiddleware({ app, path: config.api.graphql.rootPath });
};
