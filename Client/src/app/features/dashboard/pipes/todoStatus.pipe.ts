import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from "../../models/todo-board";

@Pipe({name: 'todoStatus'})

export class todoStatusTodo implements PipeTransform {
  transform(data: Todo[] | null | undefined, typeStatus: Todo['status']) {
    let todoArray: Todo[] = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === typeStatus) {
        todoArray.push(data[i])
      }
    }
    return todoArray
  }
}
