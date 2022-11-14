import {createReducer, on} from "@ngrx/store";
import {Todo} from "../../../models/todo-board";
import {TodoActions} from "../actions/todo.actions";


export interface TodoState {
  todo: Todo[] | any,
  status: 'pending' | 'loading' | 'error' | 'success',
  error: string | null | any
}

const initialState: TodoState = {
  todo: [],
  status: "pending",
  error: null
}

export const todoReducer = createReducer(
  initialState,

  on(TodoActions.addTodo, (state, {todo}) => ({
    ...state,
    todo: todo
  })),

  on(TodoActions.removeTodo, (state, {id}) => ({
    ...state,
    id: id
  })),

  on(TodoActions.loadTodo, (state, {dashboardId}) => ({
    ...state,
    status: 'loading',
    dashboardId: dashboardId
  })),

  on(TodoActions.loadTodoSuccess, (state, {todo}) => ({
    ...state,
    todo: todo,
    status: 'success',
    error: null

  })),

  on(TodoActions.loadTodoFailure, (state, {error}) => ({
    ...state,
    status: 'error',
    error: error
  }))
)
