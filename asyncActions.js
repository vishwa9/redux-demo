const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").thunk;
const axios = require("axios");
const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEDED = "FETCH_USERS_SUCCEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};
const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEDED,
    payload: users,
  };
};

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCEDED:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        users: [],
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message));
      })
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
    console.log(store.getState());
})
store.dispatch(fetchUsers());
