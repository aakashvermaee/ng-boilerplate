import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import {
  LocalStorageService,
  APP_CONSTANTS,
  AuthorizationService,
  LoggerService,
} from '@ng-boilerplate/shared';

/**
 * Interceptor to make refresh-token requests and, update same in localStorage
 */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthorizationService,
    private localStorageService: LocalStorageService,
    private logger: LoggerService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (req.url.includes('refresh-token') || req.url.includes('login')) {
          this.logger.error('Error occured in either login or refresh api');

          if (req.url.includes('refresh-token')) {
            // logout and redirect to login
            this.logger.error(
              'Error occured in refresh token. So logout current user and redirecting to login'
            );
            this.logoutUser();
          }

          return throwError(err);
        }

        // If error status is different than 401 we want to skip refresh token
        // So we check that and throw the error if it's the case
        if (err.status !== 401) {
          return throwError(err);
        }

        req = this.addAuthenticationToken(req);

        if (this.refreshTokenInProgress) {
          // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
          // – which means the new token is ready and we can retry the request again
          this.logger.debug('Refresh tokken in progress');

          return this.refreshTokenSubject.pipe(
            filter((result) => result != null),
            take(1),
            switchMap(() => {
              return next.handle(this.addAuthenticationToken(req));
            })
          );
        } else {
          this.refreshTokenInProgress = true;
          this.logger.debug('call refresh token api to get new tokens');

          // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
          this.refreshTokenSubject.next(null);

          // Call auth.refreshAccessToken(this is an Observable that will be returned)
          return this.authService.refreshToken().pipe(
            switchMap((tokenObj: any) => {
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              this.logger.debug('refresh token:', tokenObj);
              this.updateAccessToken(tokenObj);
              this.refreshTokenInProgress = false;
              this.refreshTokenSubject.next(tokenObj);

              return next.handle(this.addAuthenticationToken(req));
            }),
            catchError((err2) => {
              this.logger.debug('Refresh token api failed');
              this.refreshTokenInProgress = false;
              // this.logoutUser();
              return throwError(err2);
            })
          );
        }
      })
    );
  }

  addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // Get access token from Local Storage
    const isAccessTokens =
      this.localStorageService.getItem(APP_CONSTANTS.auth.accessToken) &&
      this.localStorageService.getItem(APP_CONSTANTS.auth.refreshToken);

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!isAccessTokens) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        'content-type': 'application/json',
        [APP_CONSTANTS.auth.refreshToken]: this.localStorageService.getItem(
          APP_CONSTANTS.auth.refreshToken
        ),
        [APP_CONSTANTS.auth.accessToken]: this.localStorageService.getItem(
          APP_CONSTANTS.auth.accessToken
        ),
      },
    });
  }

  logoutUser(): void {
    this.authService.logoutUser();
  }

  updateAccessToken(tokenConfig: any): void {
    this.localStorageService.setItem(
      APP_CONSTANTS.auth.accessToken,
      tokenConfig[APP_CONSTANTS.auth.accessToken]
    );

    this.localStorageService.setItem(
      APP_CONSTANTS.auth.refreshToken,
      tokenConfig[APP_CONSTANTS.auth.refreshToken]
    );
  }
}
