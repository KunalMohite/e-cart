import { combineReducers } from "redux";
import * as actionType from "../actions/ActionTypes";

const initialState = {
  successMsg: null,
  errorMsg: null,
  jwtToken: null,
  loginError: null,
  signUpLoading: false,
  loginLoading:false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.CREATE_USER_REQUESTED: {
      return {
        ...state,
        signUpLoading: true
      };
    }
    case actionType.CREATE_USER_SUCCESS: {
      return {
        ...state,
        successMsg: action.successMsg,
        signUpLoading: false
      };
    }
    case actionType.CREATE_USER_FAIL: {
      return {
        ...state,
        errorMsg: action.errorMsg,
        signUpLoading: false
      };
    }
    case actionType.RESET_DATA: {
      return {
        successMsg: null,
        errorMsg: null,
        loginError:null,
      };
    }
    case actionType.LOGIN_ACCESS_REQUESTED: {
      return {
        ...state,
        loginLoading:true
      };
    }
    case actionType.LOGIN_ACCESS_SUCCESS: {
      return {
        ...state,
        jwtToken: action.payload,
        loginLoading:false
      };
    }
    case actionType.LOGIN_ACCESS_FAIL: {
      return {
        ...state,
        loginError: action.loginErrorMsg,
        loginLoading:false
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

const rootReducer = combineReducers({
  userReducer,
});

export default rootReducer;
