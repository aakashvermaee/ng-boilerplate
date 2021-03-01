import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginDataDTO, User } from '../models';
import { ENVIRONMENT_CONFIG, IEnvironmentConfig } from '../types';
import { EncryptService } from './encrypt.service';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageService: LocalStorageService,
    private encryptService: EncryptService,
    @Inject(ENVIRONMENT_CONFIG) private environment: IEnvironmentConfig
  ) {}

  loginUser(user: LoginDataDTO): Observable<any> {
    // replace plain text password with the MD5 Hash
    user.password = this.encryptService.generateMD5Hash(user.password);

    return this.http
      .post(`${this.environment.BASE_URL}/login`, user, {
        observe: 'response',
      })
      .pipe(
        tap((res) => {
          this.setLoggedInUser(res);
        })
      );
  }

  logoutUser(): void {
    this.localStorageService.clear();
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return this.localStorageService.checkLogin();
  }

  setLoggedInUser(response: any): void {
    const user = new User().deserialize(response);
    this.localStorageService.setUser(user);
  }

  forgotPassword(data?: any): Observable<any> {
    return this.http.post(`${this.environment.BASE_URL}/forgot-password`, data || {});
  }

  refreshToken(data?: any): Observable<any> {
    return this.http.post(`${this.environment.BASE_URL}/refresh-token`, data || {});
  }
}
