import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import withPromise from './../src/index';

const middlewares = [thunk, withPromise];
const mockStore = configureStore(middlewares);

const userReducerWithPromise = (state, action) => {
  switch (action.type) {
    case 'USERS_FETCH':
    case 'USERS_LOADED':
    case 'USERS_FETCH_ERROR':
      return {
        ...state,
        busy: action.busy,
        users: action.payload,
        error: action.error,
      };
  }
};

describe('Action creators', () => {
  const store = mockStore({
    busy: false,
  });
  test('the store should dispatch both aync and async actions', () => {
    // Dispatch the action
    store.dispatch({
      type: 'MY_ACTION'
    });
    store.dispatch({
      type: 'MY_ACTION',
      promise: Promise.resolve(),
    });

    // Test if your store dispatched the expected actions
    const actions = store.getActions();
    expect(actions.length).toEqual(2)
  });

  xtest('should dispatch "successType" action type (if provided) if promise is resolved', done => {
    const asyncDataLoader = new Promise((resolve, reject) => {
    });
    store.dispatch({
      type: 'USERS_FETCH',
      promise: asyncDataLoader,
    });
    expect(store.getState()).toEqual({ busy: true });
    done();
  });
  xtest('should dispatch "rejectType" action type (if provided) if promise is rejected', () => {
  });

  xtest('should dispatch busy:true if promise has not been resolved', () => {
  });
  xtest('should dispatch busy:false if promise has been resolved or rejected', () => {
  });

  xtest('should dispatch action with correct payload if promise resolves', () => {
  });
  xtest('should dispatch action with error if promise is rejected', () => {
  });
});