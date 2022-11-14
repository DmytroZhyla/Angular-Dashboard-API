import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "../reducers/auth.reducer";

export namespace authSelectors {
  export const state = createFeatureSelector<AuthState>("auth")

  export const userData = createSelector(state, (state) => {
    return state.name
  })
}
