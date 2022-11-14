import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {map, mergeMap} from "rxjs";
import {TodoActions} from "../actions/todo.actions";
import {TodoService} from "../../services/todo.service";

@Injectable()
export class TodoEffects {
  loadTodo$ = createEffect(() => {
    console.log('started')
    return this.actions$.pipe(ofType(TodoActions.loadTodo),
      mergeMap((action) => {
        console.log(action)
        return this.todoService.getTodosAssignedToDashboard(action.dashboardId).pipe(
          map(data => {
            console.log(data)
            return TodoActions.loadTodoSuccess({todo: data})
          })
        )
      })
    )
  })

  constructor(
    private actions$: Actions,
    private store$: Store,
    private todoService: TodoService
  ) {
  }
}
