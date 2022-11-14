import {createAction, props} from "@ngrx/store";
import {Todo} from "../../../models/todo-board";

export namespace TodoActions {


  export const addTodo = createAction(
    '[Todo Page] Add Todo',
    props<{ todo: Todo }>()
  )

  export const removeTodo = createAction(
    '[Todo Page] Remove Todo',
    props<{ id: string }>()
  )

  export const loadTodo = createAction(
    '[Todo Page] load Todo',
    props<{ dashboardId: string }>()
  )

  export const loadTodoSuccess = createAction(
    '[Todo Page] load Todo Success',
    props<{ todo: Todo[] | any }>()
  )

  export const loadTodoFailure = createAction(
    '[Todo Page] load Todo Failed',
    props<{ error: string }>()
  )

}
