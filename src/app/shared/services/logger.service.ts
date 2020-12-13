import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export const LOG_TYPE = {
  DEBUG: { type: 'DEBUG', color: 'green' },
  WARNING: { type: 'WARNING', color: 'yellow' },
  INFO: { type: 'INFO', color: 'cyan' },
  ERROR: { type: 'ERROR', color: 'red' },
};

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  private canExecute() {
    return environment.production;
  }

  info(message: any) {
    if (!this.canExecute()) {
      console.info(`%c${LOG_TYPE.INFO.type}`, `color: ${LOG_TYPE.INFO.color}`, message);
    }
  }

  debug(message: any) {
    if (!this.canExecute()) {
      console.debug(`%c${LOG_TYPE.DEBUG.type}`, `color: ${LOG_TYPE.DEBUG.color}`, message);
    }
  }

  error(message: any) {
    if (!this.canExecute()) {
      console.error(`%c${LOG_TYPE.ERROR.type}`, `color: ${LOG_TYPE.ERROR.color}`, message);
    }
  }

  warning(message: any) {
    if (!this.canExecute()) {
      console.warn(`%c${LOG_TYPE.WARNING.type}`, `color: ${LOG_TYPE.WARNING.color}`, message);
    }
  }
}
