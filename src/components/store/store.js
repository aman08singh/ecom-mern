import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
//Check below line for error, because i have imported differently
import rootReducer from "../reducers/rootReducer";

const initialState = {};
const middleware = [thunk];

//This is working without window.__REDUX...... line
// The line below const comoseEnancers works, as i found a way in window.__REDUX...... documentations.
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(applyMiddleware(...middleware)),
//   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        initialState
      })
    : compose;

const enhancer = composeEnhancers(
  // initialState,
  applyMiddleware(...middleware)
  // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);

export default store;
