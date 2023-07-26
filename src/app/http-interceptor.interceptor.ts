import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              alert('Unauthorized access!');
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            alert('Unauthorized access!');
          } else if (error.status === 404) {
            alert('Page Not Found!');
          } else if (error.status === 408) {
            alert('Request timed out!');
          }
        },
      })
    );
  }
}
