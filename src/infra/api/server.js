const express = require('express');
const graphql = require('./graphql');
const rest = require('./rest');

async function start(config) {
  const app = express();

  await rest(app, config);
  await graphql(app, config);

  return app.listen({ port: config.api.port }, () =>
    console.log(`🚀 Server is UP and 🌪️ Spinning on port ${config.api.port}`)
  );
}

module.exports = start;
module.exports.start = start;
