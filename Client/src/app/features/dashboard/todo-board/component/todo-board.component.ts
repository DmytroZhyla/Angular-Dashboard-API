import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../../shared/services/modal.service";
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../../models/todo-board";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {TodoActions} from "../../store/actions/todo.actions";
import {todoSelectors} from "../../store/selectors/todo.selectors";


@Component({
  selector: 'app-todo-board',
  templateUrl: './todo-board.component.html',
  styleUrls: ['./todo-board.component.scss']
})
export class TodoBoardComponent implements OnInit {
  todos$!: Observable<Todo[]>
  status: Todo['status'] = "todo"
  currenId!: string
  currentTodoId!: string
  DragTaskId: string = ''
  NameFilter: any;
  nameClicked: boolean = false
  dateTitle: string = 'Date'
  nameTitle: string = 'Name'
  dateClicked: boolean = false
  todoColor: string = '#FFFFFF'
  progressColor: string = '#FFFFFF'
  doneColor: string = '#FFFFFF'

  todoForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.min(1)])
  })

  constructor(
    private modalService: ModalService,
    private TodoService: TodoService,
    private route: ActivatedRoute,
    private store$: Store<{}>
  ) {
    this.route.params.subscribe(params => {
      this.currenId = params['id']
    });
    this.store$.dispatch(TodoActions.loadTodo({dashboardId: this.currenId}))
  }


  ngOnInit(): void {
    this.todos$ = this.store$.select(todoSelectors.todoData)
  }

  openModal(id: string, type?: Todo['status']) {
    if (type) {
      this.status = type
    }
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  add(id: string) {
    let data = this.todoForm.getRawValue()
    data.status = this.status
    data.assigned_to_board = this.currenId
    this.TodoService.postNewTodo(data, this.currenId).subscribe(() => {
      this.store$.dispatch(TodoActions.loadTodo({dashboardId: this.currenId}))
    })
    this.todoForm.reset()
    this.modalService.close(id);
  }

  sortTodoDate() {
    if (!this.dateClicked) {
      this.resetAllTitles()
      this.dateTitle = 'Date (DESC)'
      this.dateClicked = !this.dateClicked
      this.todos$ = this.todos$.pipe(map((todo => todo.slice().sort((a, b) =>
        new Date(a.created_date).getTime() - new Date(b.created_date).getTime()))))
    } else {
      this.resetAllTitles()
      this.dateTitle = 'Date (ASC)'
      this.dateClicked = !this.dateClicked
      this.todos$ = this.todos$.pipe(map((todo => todo.slice().sort((a, b) =>
        new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
      ))))
    }
  }

  sortTodoByName() {
    if (!this.nameClicked) {
      this.nameClicked = !this.nameClicked
      this.resetAllTitles()
      this.nameTitle = 'Name(DESC)'
      this.todos$ = this.todos$.pipe(map((todo => todo.slice().sort((a, b) =>
        (a.name < b.name) ? -1 : 1))))
    } else {
      this.nameClicked = !this.nameClicked
      this.resetAllTitles()
      this.nameTitle = 'Name(ASC)'
      this.todos$ = this.todos$.pipe(map((todo => todo.slice().sort((a, b) =>
        (a.name > b.name) ? -1 : 1))))
    }
  }

  resetAllTitles() {
    this.nameTitle = 'Name'
    this.dateTitle = 'Date'
  }

  dragStart(event: any) {
    this.DragTaskId = event.target.id
    console.log(this.DragTaskId)
  }

  dragDrop(event: any) {
    event.stopPropagation();
    event.preventDefault();
    for (let i = 0; i < event.path.length; i++) {
      if (event.path[i].id === 'progress_container') {
        this.TodoService.patchStatusToTodo(this.DragTaskId, 'progress')
      } else if (event.path[i].id === 'done_container') {
        this.TodoService.patchStatusToTodo(this.DragTaskId, 'done')
      } else if (event.path[i].id === 'todo_container') {
        this.TodoService.patchStatusToTodo(this.DragTaskId, 'todo')
      }
      this.store$.dispatch(TodoActions.loadTodo({dashboardId: this.currenId}))
    }
  }

  dragOver(event: any) {
    event.preventDefault();
  }

  deleteTask(taskId: string) {
    this.TodoService.deleteTodoById(taskId).subscribe(() => {
      this.store$.dispatch(TodoActions.loadTodo({dashboardId: this.currenId}))
    })
  }

  changeTask(taskId: string
  ) {
    this.currentTodoId = taskId
    this.openModal('custom-modal-2')
  }

  changeTaskRequest() {
    this.TodoService.patchTodoName(this.currentTodoId, this.todoForm.getRawValue().name)
      .subscribe(() => {
        this.store$.dispatch(TodoActions.loadTodo({dashboardId: this.currenId}))
      })
    this.todoForm.reset()
    this.closeModal('custom-modal-2')
  }

  archiveTask(taskId: string) {
    this.TodoService.archiveTodoById(taskId, 'deleted').subscribe(() => {
      this.store$.dispatch(TodoActions.loadTodo({dashboardId: this.currenId}))
    })
  }
}
