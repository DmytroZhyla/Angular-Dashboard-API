import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DashboardState} from "../reducers/dashboard.reducers";


export namespace dashboardSelectors {
  export const state = createFeatureSelector<DashboardState>("dashboard")


  export const dashboardData = createSelector(state, (state) => {
    return state.dashboards;
  })

}

