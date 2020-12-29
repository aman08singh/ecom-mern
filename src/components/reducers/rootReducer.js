//This is index.js file, i have changed the name to rootReducer

import { combineReducers } from "redux";
import errorReducers from "./errorReducers";
import authReducers from "./authReducers";

export default combineReducers({
    auth: authReducers,
    errors: errorReducers
});