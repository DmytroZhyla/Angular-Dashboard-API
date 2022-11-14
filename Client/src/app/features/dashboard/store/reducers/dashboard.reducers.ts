import {Dashboard} from "../../../models/dashboard";
import {createReducer, on} from "@ngrx/store";
import {DashboardActions} from "../actions/dashboard.actions";


export interface DashboardState {
  dashboards: Dashboard[] | any,
  status: 'pending' | 'loading' | 'error' | 'success',
  error: string | null | any,
  sortDirection: string;
  sortKey: string;
  filterQuery: string;
  filterBy: string[];
}

const initialState: DashboardState = {
  dashboards: [],
  status: "pending",
  error: null,
  sortDirection: '',
  sortKey: '',
  filterQuery: '',
  filterBy: []
}

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.addDashboard, (state, {dashboard}) => ({
    ...state,
    dashboard: dashboard
  })),

  on(DashboardActions.removeDashboard, (state, {id}) => ({
    ...state,
    id: id
  })),

  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    status: 'loading'
  })),

  on(DashboardActions.loadDashboardSuccess, (state, {dashboards}) => ({
    ...state,
    dashboards: dashboards,
    status: 'success',
    error: null
  })),

  on(DashboardActions.loadDashboardFailure, (state, {error}) => ({
    ...state,
    status: 'error',
    error: error
  })),
);

