import {Component, OnInit} from '@angular/core';
import {Dashboard} from "../../models/dashboard";
import {DashboardService} from "../services/dashboard.service";
import {map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {dashboardSelectors} from "../store/selectors/dashboard.selectors";
import {DashboardActions} from "../store/actions/dashboard.actions";
import {Router} from "@angular/router";
import {ModalService} from "../../../shared/services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboards$!: Observable<Dashboard[]>
  nameClicked: boolean = false
  dateClicked: boolean = false
  nameTitle: string = 'Name'
  dateTitle: string = 'Date'
  NameFilter: string;
  dashboardInfo: Dashboard = {
    name: '',
    description: '',
    _id: '',
    created_date: '',
    updatedAt: ''

  }
  currentDashboardId: string = '';
  dashboardForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.min(2)]),
    description: new FormControl('', [
      Validators.required,
      Validators.min(2)])
  })


  constructor(
    private dashboardService: DashboardService,
    private store$: Store<{}>,
    private router: Router,
    private modalService: ModalService
  ) {
    this.store$.dispatch(DashboardActions.loadDashboard())
  }


  ngOnInit(): void {
    this.dashboards$ = this.store$.select(dashboardSelectors.dashboardData)
  }

  selectDashboard(dashboard: Dashboard) {
    console.log(dashboard._id)
    this.router.navigate(['dashboard', dashboard._id])
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  add(id: string) {
    this.dashboardService.postNewDashboard(this.dashboardForm.getRawValue()).subscribe(() => {
      this.store$.dispatch(DashboardActions.loadDashboard())
    })
    this.dashboardForm.reset()
    this.modalService.close(id);
  }

  sortDate() {
    if (!this.dateClicked) {
      this.resetAllTitles()
      this.dateTitle = 'Date (DESC)'
      this.dateClicked = !this.dateClicked
      this.dashboards$ = this.dashboards$.pipe(map((dashboard => dashboard.slice().sort((a, b) =>
        new Date(a.created_date).getTime() - new Date(b.created_date).getTime()))))
    } else {
      this.resetAllTitles()
      this.dateTitle = 'Date (ASC)'
      this.dateClicked = !this.dateClicked
      this.dashboards$ = this.dashboards$.pipe(map((dashboard => dashboard.slice().sort((a, b) =>
        new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
      ))))
    }
  }

  sortDashboardByName() {
    if (!this.nameClicked) {
      this.nameClicked = !this.nameClicked
      this.resetAllTitles()
      this.nameTitle = 'Name(DESC)'
      this.dashboards$ = this.dashboards$.pipe(map((dashboard => dashboard.slice().sort((a, b) =>
        (a.name < b.name) ? -1 : 1))))
    } else {
      this.nameClicked = !this.nameClicked
      this.resetAllTitles()
      this.nameTitle = 'Name(ASC)'
      this.dashboards$ = this.dashboards$.pipe(map((dashboard => dashboard.slice().sort((a, b) =>
        (a.name > b.name) ? -1 : 1))))
    }
  }

  resetAllTitles() {
    this.nameTitle = 'Name'
    this.dateTitle = 'Date'
  }

  changeDashboard(DashboardId: string) {
    this.currentDashboardId = DashboardId
    this.openModal('custom-modal-2')
  }

  changeDashboardRequest() {
    if (
      this.dashboardForm.valid
    ) {
      this.dashboardService.patchDashboard(
        this.currentDashboardId,
        this.dashboardForm.getRawValue().name,
        this.dashboardForm.getRawValue().description)
        .subscribe(() => {
          this.store$.dispatch(DashboardActions.loadDashboard())
        })
      this.dashboardForm.reset()
      this.closeModal('custom-modal-2')
    } else alert('Please fill all inpunts')
  }

  deleteDashboard(dashboardId: string) {
    this.dashboardService.deleteDashboard(dashboardId).subscribe(() => {
      this.store$.dispatch(DashboardActions.loadDashboard())
    })
  }

  infoDashboard(dashboardId: string) {
    this.dashboardService.getDashboardById(dashboardId).subscribe((res: Dashboard) => {
      this.dashboardInfo = res
      this.openModal('custom-modal-3')
    })
  }
}























































































































