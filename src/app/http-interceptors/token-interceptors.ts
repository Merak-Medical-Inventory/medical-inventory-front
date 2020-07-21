import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private router: Router;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token != null) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(modifiedReq).pipe(catchError((err: HttpErrorResponse) => {
        console.log(err.status);
        if (err.status === 401) {
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('token');
          localStorage.removeItem('User');
          this.router.navigate([ '/login']).then();
        }
        return throwError(err);
      }));
    }
    return next.handle(req);
  }
}
