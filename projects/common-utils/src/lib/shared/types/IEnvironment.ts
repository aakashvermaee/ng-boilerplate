import { InjectionToken } from '@angular/core';

/**
 * This interface defines app's entire env
 */
export interface IEnvironmentConfig {
  production: boolean;
  BASE_URL?: string;
}

export const ENVIRONMENT_CONFIG: InjectionToken<IEnvironmentConfig> = new InjectionToken('');
