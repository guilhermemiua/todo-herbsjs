const { usecase2mutation } = require('@herbsjs/herbs2gql');
const defaultResolver = require('./defaultResolver');

function factory(usecases) {
  const mutations = usecases.map((usecase) =>
    usecase2mutation(usecase(), defaultResolver(usecase))
  );
  /* Custom Mutations */
  // mutations.push(require('./custom/createItem'))
  return mutations;
}

module.exports = { factory };
