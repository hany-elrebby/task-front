import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Notification} from './notification';
import {catchError, throwError} from 'rxjs';

@Injectable()
export class Error implements HttpInterceptor {

    constructor(private notify: Notification) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                this.notify.error(error.error?.message || 'Something went wrong');
                return throwError(() => error);
            })
        );
    }
}

