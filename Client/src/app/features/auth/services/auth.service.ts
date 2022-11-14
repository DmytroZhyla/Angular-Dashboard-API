import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtName = 'jwt_token'
  userName = 'user_name'

  constructor() {
  }

  public signOut() {
    localStorage.clear()
  }

  public saveJWT(token: string) {
    localStorage.removeItem(this.jwtName)
    localStorage.setItem(this.jwtName, token)
  }

  public getJWT(): string {
    return localStorage.getItem(this.jwtName)!
  }

  public saveName(username: string) {
    localStorage.removeItem(this.userName)
    localStorage.setItem(this.userName, username)
  }

  public getName(): string {
    return localStorage.getItem(this.userName)!
  }
}
