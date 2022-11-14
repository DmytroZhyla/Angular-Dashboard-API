import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from "@angular/router";
import {StoreModule} from "@ngrx/store";
import {authReducer} from "../features/auth/store/reducers/auth.reducer";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('auth', authReducer),
  ]
})
export class CoreModule { }
