import {createAction, props} from "@ngrx/store";
import {AuthResponse} from "../../../models/authResponse";

export namespace authActions {

  export const isAuthed = createAction(
    "[Auth] Is_Authed",
    props<{ name: string }>()
  )
  export const tryToLogin = createAction("[Login] Try_To_Login")

  export const loginSuccess = createAction(
    "[Login] Success_Login",
    props<{ userData: AuthResponse }>()
  )
  export const loginFailure = createAction(
    "[Login] Success_Login ",
    props<{ error: string }>()
  )
}
