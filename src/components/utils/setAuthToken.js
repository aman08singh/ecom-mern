import axios from "axios";

const setAuthToken = token => {
    if(token) {
        // Apply authorization token to every request if logged in
        axios.defaults.headers.common["Authorization"] = token;
        console.log("Edited token from setAuthTokens", axios.defaults.headers.common["Authorization"]);
    }
    else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;