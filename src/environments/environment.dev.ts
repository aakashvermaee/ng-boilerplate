import { ROOT_ENVIRONMENT } from '../../env';
import { IEnvironmentConfig } from '@ng-boilerplate/shared';

export const environment: IEnvironmentConfig = {
  ...ROOT_ENVIRONMENT,
  production: false,
};
