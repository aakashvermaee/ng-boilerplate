import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { APP_CONSTANTS } from '../constants';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformID: string) {}

  private canExecute(): boolean {
    return isPlatformBrowser(this.platformID);
  }

  getItem(key: string): any {
    if (this.canExecute()) {
      return localStorage.getItem(key);
    }
  }

  setItem(key: string, value: any): void {
    if (this.canExecute()) {
      value = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, value);
    }
  }

  setUser(user: User) {
    this.setItem(APP_CONSTANTS.auth.name, user.name);
    this.setItem(APP_CONSTANTS.auth.accessToken, user.accountToken);
    this.setItem(APP_CONSTANTS.auth.refreshToken, user.refreshToken);
  }

  clear(): void {
    if (this.canExecute()) {
      localStorage.clear();
    }
  }

  checkLogin(): boolean {
    return localStorage.getItem(APP_CONSTANTS.auth.name) ? true : false;
  }
}
