import {createAction, props} from "@ngrx/store";
import {Dashboard} from "../../../models/dashboard";

export namespace DashboardActions {

  export const addDashboard = createAction(
    '[Dashboard Page] Add Dashboard',
    props<{ dashboard: Dashboard }>()
  )

  export const removeDashboard = createAction(
    '[Dashboard Page] Remove Dashboard',
    props<{ id: string }>()
  )

  export const loadDashboard = createAction(
    '[Dashboard Page] load Dashboard',
  )

  export const loadDashboardSuccess = createAction(
    '[Dashboard Page] load Dashboard Success',
    props<{ dashboards: Dashboard[] | any }>()
  )

  export const loadDashboardFailure = createAction(
    '[Dashboard Page] load Dashboard Failed',
    props<{ error: string }>()
  )
}
