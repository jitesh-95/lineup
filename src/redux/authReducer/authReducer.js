import {
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./authActionTypes";

let Token = localStorage.getItem("token");
const initialState = {
  isLoading: false,
  isError: false,
  token: Token ? Token : "",
  isAuth: Token ? true : false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST: {
      return { ...state, isLoading: true };
    }
    case SIGNUP_SUCCESS: {
      return { ...state, isLoading: false };
    }
    case SIGNUP_ERROR: {
      return { ...state, isLoading: false };
    }
    //login
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true };
    }
    case LOGIN_SUCCESS: {
      localStorage.setItem("token", payload);
      return { ...state, isLoading: false, token: payload, isAuth: true };
    }
    case LOGIN_ERROR: {
      return { ...state, isLoading: false, token: "", isAuth: false };
    }
    case LOGOUT: {
      localStorage.removeItem("token", payload);
      return { ...state, isLoading: false, token: "", isAuth: false };
    }

    default:
      return state;
  }
};
