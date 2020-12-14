import { Injectable } from '@angular/core';
import { md5 } from 'pure-md5';

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  constructor() {}

  generateMD5Hash(password: string): string {
    return md5(password.trim());
  }
}
