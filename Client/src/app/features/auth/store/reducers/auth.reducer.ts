import {createReducer, on} from "@ngrx/store";
import {authActions} from "../actions/auth.actions";

export interface AuthState {
  name: string,
  jwt_token: string | null,
  isAuthed: boolean,
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: AuthState = {
  name: '',
  jwt_token: null,
  isAuthed: false,
  error: null,
  status: "pending"
}

export const authReducer = createReducer(
  initialState,

  on(authActions.tryToLogin, (state) => ({
    ...state,
    status: "loading"
  })),

  on(authActions.loginSuccess, (state, {userData}) => ({
    ...state,
    name: userData.name,
    jwt_token: userData.jwt_token,
    error: null,
    status: "success"
  })),

  on(authActions.loginFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: "error"
  })),

  on(authActions.isAuthed, (state, {name}) => ({
    ...state,
    name: name,
  })),
)
