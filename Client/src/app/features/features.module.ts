import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardModule} from "./dashboard/dashboard.module";
import {AuthModule} from "./auth/auth.module";
import {StoreModule} from "@ngrx/store";
import {dashboardReducer} from "./dashboard/store/reducers/dashboard.reducers";
import {EffectsModule} from "@ngrx/effects";
import {DashboardEffect} from "./dashboard/store/effects/dashboard.effect";
import {todoReducer} from "./dashboard/store/reducers/todo.reducers";
import {TodoEffects} from "./dashboard/store/effects/todo.effects";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    AuthModule,
    StoreModule.forFeature('dashboard', dashboardReducer),
    StoreModule.forFeature('todo', todoReducer),
    EffectsModule.forFeature([DashboardEffect, TodoEffects])
  ]
})
export class FeaturesModule { }
