import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TodoState} from "../reducers/todo.reducers";


export namespace todoSelectors {
  export const state = createFeatureSelector<TodoState>("todo")


  export const todoData = createSelector(state, (state) => {
    return state.todo;
  })
}

