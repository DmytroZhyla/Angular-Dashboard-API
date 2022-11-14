import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Dashboard, DashboardResponse} from "../../models/dashboard";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  url = 'http://localhost:8080/api/dashboard'

  constructor(
    private http: HttpClient,
  ) {
  }

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<DashboardResponse>(this.url).pipe(
      map((data) => {
        let dashboardsArr: Dashboard[] = []
        for (let dashboard of data.dashboards) {
          dashboardsArr.push(dashboard)
        }
        return dashboardsArr
      })
    );
  }

  getDashboardById(dashboardId: string): Dashboard | any {
    return this.http.get(this.url + `/${dashboardId}`)
  }


  postNewDashboard(data: Dashboard) {
    return this.http.post(this.url, {data})
  }

  patchDashboard(dashboardId: string, name: Dashboard["name"], description: Dashboard["description"]) {
    return this.http.patch(this.url + `/${dashboardId}`, {name, description})
  }

  deleteDashboard(dashboardId: string,) {
    return this.http.delete(this.url + `/${dashboardId}`)
  }
}

