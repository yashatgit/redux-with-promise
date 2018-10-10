/*
 * @param action : {
 *  type:        The type of action you need to dispatch
 *  successType: if you need a separate action when the promise is successful, use this,
 *  rejectType:  if you need a separate action when the promise is successful, use this,
 *  promise:     the promise
 * }
 *
 *
 * @returns action : {
 *  ...action,
 *  busy:       true or false based on the promise state,
 *  payload:    data when promise is resolved successfully,
 *  error:      error when promise is not resolved successfully,
 * }
 * */
const withPromiseMiddleware = () => next => action => {
  if (!action.promise) {
    return next(action);
  }

  function buildAction(busy, data) {
    const newAction = Object.assign({}, action, { busy }, data);

    //Delete so that this action doesn't come back again because of the promise.
    delete newAction.promise;
    return newAction;
  }

  /*
   * Stage 1:
   * Begin the is-loading phase.
   *
   * dispatch the initial action when promise executes.
   * Busy flag will be set to true so that you can show loader
   * */
  next(buildAction(true));

  /*
   * Stage 2:
   * Handle the loading & error phase.
   *
   * dispatch will return the promise so the caller can wait.
   * */
  return action.promise
    .then((payload) => {
      next(buildAction(false,
        {
          payload,
          type: action.successType || action.type,
        }
      ));
      return payload;
    })
    .catch((error) => {
      next(buildAction(false,
        {
          error,
          type: action.rejectType || action.type,
        }
      ));
      throw error;
    });
};

export default withPromiseMiddleware;
