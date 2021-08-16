const { generateRoutes } = require('@herbsjs/herbs2rest');
const cors = require('cors');
const express = require('express');
const renderShelfHTML = require('@herbsjs/herbsshelf');
const usecases = require('../../../domain/usecases');
const db = require('../../data/database');
const repositoriesFactory = require('../../data/repositories');

function prepareUsecases(usecases) {
  return Promise.all(
    usecases.map((uc) => {
      const clonedUC = { ...uc };
      clonedUC.usecase = clonedUC.usecase({})();
      return clonedUC;
    })
  );
}

async function prepareRoutes(config) {
  const conn = await db.factory(config);
  const repositories = await repositoriesFactory(conn);

  const routes = [
    {
      name: 'users',
      post: {
        usecase: require('../../../domain/usecases/user/createUser')(
          repositories
        ),
      },
      put: {
        usecase: require('../../../domain/usecases/user/updateUser')(
          repositories
        ),
      },
      delete: {
        usecase: require('../../../domain/usecases/user/deleteUser')(
          repositories
        ),
      },
      getById: {
        usecase: require('../../../domain/usecases/user/findOneUser')(
          repositories
        ),
      },
    },
    {
      name: 'todos',
      post: {
        usecase: require('../../../domain/usecases/todo/createTodo')(
          repositories
        ),
      },
    },
  ];

  return routes;
}

module.exports = async (app, config) => {
  app.use(express.json({ limit: '50mb' }));
  app.use(cors());

  const router = new express.Router();

  const verbose = !config.isProd;
  const routes = await prepareRoutes(config);
  generateRoutes(routes, router, verbose);
  app.use(router);

  // Preparing Use Cases for documentation
  const ucs = await prepareUsecases(usecases);

  const shelf = renderShelfHTML(ucs);
  app.get('/herbsshelf', (_, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write(shelf);
    res.end();
  });
};
