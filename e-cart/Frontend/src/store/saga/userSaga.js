import * as actionType from "../actions/ActionTypes";
import { put, call, takeEvery, all } from "redux-saga/effects";
import apis from "../../constants/api-url";

function* postUserData(action) {
  const { payload } = action;
  const { data } = payload;

  try {
    const response = yield call(() =>
      apis.post(`/users/signup`, data)
    );
    yield put({
      type: actionType.CREATE_USER_SUCCESS,
      payload: response.data,
      successMsg: "You have Successfully Registered.",
    });
  } catch (error) {
    console.log("Error message is", error.message)
    yield put({
      type: actionType.CREATE_USER_FAIL,
      errorMsg:
         "Registration failed. Network Error or the email address provided may be registered already.",
    });
  }
}

function* postUserDataSaga() {
  yield takeEvery(actionType.CREATE_USER_REQUESTED, postUserData);
}

function* authenticateLogin(action) {
  const { payload } = action;
  const { userData } = payload;

  try {
    const response = yield call(() =>
      apis.post(`/users/authenticate`, userData)
    );
    yield put({
      type: actionType.LOGIN_ACCESS_SUCCESS,
      payload: response.data,
      loginSuccess: "Your logged in successfully"
    });
  } catch (error) {
    yield put({
      type: actionType.LOGIN_ACCESS_FAIL,
      loginErrorMsg:
        "Incorrect Username and Password.",
    });
  }
}

function* authenticateLoginSaga(){
  yield takeEvery(actionType.LOGIN_ACCESS_REQUESTED, authenticateLogin)
}

export default function* userSaga() {
  yield all([postUserDataSaga(), authenticateLoginSaga()]);
}
