import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

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
}
