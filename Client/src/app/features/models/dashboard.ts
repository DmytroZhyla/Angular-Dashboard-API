
export interface Dashboard {
  name: string,
  description: string,
  _id: string,
  created_date: string,
  updatedAt: string
}

export interface DashboardResponse {
  dashboards: Dashboard[]
}
