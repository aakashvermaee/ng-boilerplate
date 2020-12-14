/* tslint:disable */
import { Injectable, Inject } from '@angular/core';
import { IEnvironmentConfig, ENVIRONMENT_CONFIG } from '../types/IEnvironment';

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
  constructor(@Inject(ENVIRONMENT_CONFIG) private environment: IEnvironmentConfig) {}

  private canExecute(): boolean {
    return this.environment.production;
  }

  info(message: any): void {
    if (!this.canExecute()) {
      console.log(
        `%c[${LOG_TYPE.INFO.type} ${new Date().toISOString()}]`,
        `color: ${LOG_TYPE.INFO.color}`,
        message
      );
    }
  }

  debug(message: any): void {
    if (!this.canExecute()) {
      console.log(
        `%c[${LOG_TYPE.DEBUG.type} ${new Date().toISOString()}]`,
        `color: ${LOG_TYPE.DEBUG.color}`,
        message
      );
    }
  }

  error(message: any): void {
    if (!this.canExecute()) {
      console.log(
        `%c[${LOG_TYPE.ERROR.type} ${new Date().toISOString()}]`,
        `color: ${LOG_TYPE.ERROR.color}`,
        message
      );
    }
  }

  warning(message: any): void {
    if (!this.canExecute()) {
      console.log(
        `%c[${LOG_TYPE.WARNING.type} ${new Date().toISOString()}]`,
        `color: ${LOG_TYPE.WARNING.color}`,
        message
      );
    }
  }
}
