const { ForbiddenError } = require('apollo-server-express');
const { ApolloError } = require('apollo-server');

function args2request(args, useCase) {
  const params = {};
  const fields = Object.keys(useCase.requestSchema);
  for (const field of fields) params[field] = args[field];
  return params;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function defaultResolver(usecase) {
  return async function resolver(_, args, context) {
    const uc = usecase();
    /* Authorization */
    const hasAccess = await uc.authorize(context.user);
    if (!hasAccess) {
      console.info(uc.auditTrail);
      throw new ForbiddenError();
    }

    /* Execution */
    const request = args2request(args, uc);
    const response = await uc.run(request);

    /* Audit */
    console.info(uc.auditTrail);

    /* Response */
    if (response.isErr)
      return new ApolloError(
        response.err.message,
        response.err.code,
        response.err.stackTrace
      );
    return isEmpty(response.ok) ? true : response.ok;
  };
}

module.exports = defaultResolver;
