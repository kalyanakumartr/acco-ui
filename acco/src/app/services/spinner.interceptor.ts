import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class GetdetailsInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localToken = localStorage.getItem('token');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localToken}`

      }
    })
    // 
    this.spinnerService.requestStarted();
    return next.handle(request).pipe(tap(async (event: HttpEvent < any > ) => {
      if (event instanceof HttpResponse) {
        this.spinnerService.requestEnded();
      }
  },
  (err: any) => {
    this.spinnerService.resetSpinner();
  }));
}
    
  }

  
    
    
    


