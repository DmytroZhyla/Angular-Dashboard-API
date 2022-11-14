import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from "./component/dashboard.component";
import {TodoBoardComponent} from "./todo-board/component/todo-board.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "../../shared/modal/modal.module";
import {todoStatusTodo} from "./pipes/todoStatus.pipe";
import {Ng2SearchPipe} from "./pipes/filterName.pipe";


@NgModule({
  declarations: [
    DashboardComponent,
    TodoBoardComponent,
    todoStatusTodo,
    Ng2SearchPipe,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
