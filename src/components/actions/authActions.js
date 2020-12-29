import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

//Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/users/register", userData)
    .then((res) => {
      // console.log("From registerUser from authActions.js, Response is", res.response.data);
      history.push("/login");
    }) // Re-direct to login on successfull register
    .catch((err) =>
    // (console.log("From the catch of register", err),
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
      // )
    );
  console.log("From registerUser from authActions.js", userData);
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  console.log("Dispatch from login.js from actions in frontEnd authActions", dispatch);
  console.log("User data from login.js from actions in frontEnd authActions", userData);
  const requestOptions = {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    data: userData
};
// fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
//     .then(response => response.json())
//     .then(data => this.setState({ postId: data.id }));
// }
// axios({
//       headers: { 
//           'content-type': 'application/json'
//       },
//       method: 'post',
//       url: "http://localhost:5000/api/users/login",
//       data: userData
//   })
//   .then((response) => (response.data, console.log("In axios loign post then(block)",response)))
//   .catch((error) => error);
  axios
    ("http://localhost:5000/api/users/login", requestOptions)
    .then((res) => {
      // console.log("In axios loign post then(block)");
      //Save to localStorage
      //Set token to localStorage
      const { token } = res.data;
      console.log("Printing res.data from authActions", res.data);
      localStorage.setItem("jwtToken", token);
      //Set token to Auth reader
      setAuthToken(token);
      console.log("Token from authActions", token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      console.log("Printing decoded from authActions", decoded);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => 
    // (console.log("From the catch of login from authActions from front end", err.response.data),
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    // )
    );
};

//Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

//Log user out
export const logoutUser = () => (dispatch) => {
  //Remove token from local storage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} ehich will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
