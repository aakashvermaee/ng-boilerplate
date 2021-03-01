import { ROOT_ENVIRONMENT } from '../../env';
import { IEnvironmentConfig } from 'projects/common-utils/src';

export const environment: IEnvironmentConfig = {
  ...ROOT_ENVIRONMENT,
  production: false,
};
