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
});