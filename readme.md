# redux-with-promise

A middleware for redux to handle promised based async actions.

## Installation and Setup
`npm install redux-with-promise`

Add `withPromise` in your middleware stack.

```
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import withPromise from 'redux-with-promise';

const store = createStore(
  yourApp,
  applyMiddleware(thunk, withPromise)
)
```


## Would you need it?

`redux-with-promise` was built with an attempt to reduce the boilerplate code that goes into handling Async actions.

Let's suppose you need to load some users from an external API.
To handle the users-loading, users-error and users-loaded stages in the UI, we would need a sample code look like this:

```
const loadUsers = () => (dispatch, getState) => {
  dispatch({ type: 'USERS_FETCH' });

  someApi.get('/users')
    .then((users) => {
      dispatch({
        type: 'USERS_LOADED',
        payload: users,
      });
    })
    .catch((error) => {
      dispatch({
        type: 'USERS_FETCH_ERROR',
        error,
      });
    });
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'USERS_FETCH':
      return {
        ...state,
        busy: true,
      };
    case 'USERS_LOADED':
      return {
        ...state,
        busy: false,
        users: action.payload
      };
    case 'USERS_FETCH_ERROR':
      return {
        ...state,
        busy: false,
        error: action.error,
      };
  }
};
```


This would be a general behaviour for any Promise based handling. Though there is no issues with the above code,
`redux-with-promise` helps to reduce this boilerplate code something like this:

```
const loadUsersWithPromise = () => (dispatch, getState) => {
  dispatch({ type: 'USERS_FETCH' });

  dispatch({
    type: 'USERS_FETCH',
    successType: 'USERS_LOADED',
    rejectType: 'USERS_FETCH_ERROR',
    promise: Ajax.get('/users')
  });
};

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
```