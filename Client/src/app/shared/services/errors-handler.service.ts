import { Injectable } from '@angular/core';
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandlerService {

  constructor() { }


  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
