import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {DashboardService} from "../../services/dashboard.service";
import {DashboardActions} from "../actions/dashboard.actions";
import {map, mergeMap} from "rxjs";

@Injectable()
export class DashboardEffect {
  loadDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      mergeMap(() => {
        return this.dashboardService.getDashboards().pipe(
          map(data => {
            console.log(data)
            return DashboardActions.loadDashboardSuccess({dashboards: data})
          }),
        )
      })
    )
  })

  constructor(
    private actions$: Actions,
    private store$: Store,
    private dashboardService: DashboardService
  ) {
  }
}
