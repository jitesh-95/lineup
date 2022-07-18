import {
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./authActionTypes";
import axios from "axios";

export const register = (payload) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  return axios
    .post("https://masai-api-mocker.herokuapp.com/auth/register", payload)
    .then((r) => dispatch({ type: SIGNUP_SUCCESS, payload: r }))
    .catch((e) => dispatch({ type: SIGNUP_ERROR, payload: e }));
};

export const login = (payload) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post("https://masai-api-mocker.herokuapp.com/auth/login", payload)
    .then((r) => dispatch({ type: LOGIN_SUCCESS, payload: r.data.token }))
    .catch((e) => dispatch({ type: LOGIN_ERROR, payload: e }));
};

export const getUserDetails = (payload, user) => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  return axios
    .get(`https://masai-api-mocker.herokuapp.com/user/${user}`, {
      headers: { Authorization: `Bearer ${payload}` },
    })
    .then((r) => dispatch({ type: GET_USER_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: GET_USER_ERROR, payload }));
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: LOGOUT });
};
