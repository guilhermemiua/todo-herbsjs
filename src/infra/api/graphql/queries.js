const { usecase2query } = require('@herbsjs/herbs2gql');
const defaultResolver = require('./defaultResolver');

function factory(usecases) {
  const queries = usecases.map((usecase) =>
    usecase2query(usecase(), defaultResolver(usecase))
  );
  /* Custom Mutations */
  // queries.push(require('./custom/getItem'))
  return queries;
}

module.exports = { factory };
