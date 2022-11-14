import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../features/auth/services/auth.service";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {authSelectors} from "../../features/auth/store/selectors/auth.selectors";
import {authActions} from "../../features/auth/store/actions/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name$: Observable<string>

  constructor(
    private auth: AuthService,
    private store$: Store<{}>
  ) {
    this.name$ = this.store$.select(authSelectors.userData)
  }

  ngOnInit(): void {
    this.store$.dispatch(authActions.isAuthed(
      {name: this.auth.getName()}))
  }

  signOut(): void {
    this.auth.signOut()
    this.store$.dispatch(authActions.isAuthed(
      {name: this.auth.getName()}))
  }

}
