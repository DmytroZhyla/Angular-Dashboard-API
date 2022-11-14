import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./component/dashboard.component";
import {TodoBoardComponent} from "./todo-board/component/todo-board.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: ':id', component: TodoBoardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
