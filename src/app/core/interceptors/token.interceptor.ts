import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {
  LocalStorageService,
  APP_CONSTANTS,
  ENVIRONMENT_CONFIG,
  IEnvironmentConfig,
  AuthorizationService,
  LoggerService,
} from '@ng-boilerplate/shared';

/**
 * Interceptor to add authentication headers on every request
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    @Inject(ENVIRONMENT_CONFIG) private environment: IEnvironmentConfig,
    private authService: AuthorizationService,
    private localStorageService: LocalStorageService,
    private logger: LoggerService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      isPlatformBrowser(this.platformId) &&
      this.authService.isLoggedIn() &&
      !req.url.includes('refresh-token')
    ) {
      this.logger.debug('authenticated user so adding token');

      const modifiedRequest = req.clone({
        setHeaders: {
          'content-type': 'application/json',
          [APP_CONSTANTS.auth.accessToken]: this.localStorageService.getItem(
            APP_CONSTANTS.auth.accessToken
          ),
        },
      });

      return next.handle(modifiedRequest);
    } else {
      this.logger.debug('not authenticated user so no token or a route for refresh');
      return next.handle(req);
    }
  }
}
