import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Todo, TodoResponse} from "../../models/todo-board";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = 'http://localhost:8080/api/todo/';

  constructor(
    private http:HttpClient
  ) { }

  getTodosAssignedToDashboard(dashboardId:string): Observable<Todo[]> {
    return this.http.get<TodoResponse>(this.url + dashboardId).pipe(
      map((data) => {
        let dashboardsArr: Todo[] = []
        for (let dashboard of data.todo) {
          dashboardsArr.push(dashboard)
        }
        return dashboardsArr
      })
    );
  }

  postNewTodo(data: Todo, dashboardId: string) {
    return this.http.post(this.url + dashboardId, {data})
  }

  patchStatusToTodo(TodoId:string, status:Todo["status"]){
    return this.http.patch(this.url + TodoId + '/status', {status}).subscribe((res) => {
      return res
    })
  }

  patchTodoName(TodoId: string, name: Todo["name"]) {
    return this.http.patch(this.url + TodoId + '/name', {name})
  }


  archiveTodoById(TodoId: string, status: Todo["status"]) {
    return this.http.patch(this.url + TodoId + '/status', {status})
  }

  deleteTodoById(TodoId: string) {
    return this.http.delete(this.url + TodoId)
  }
}
