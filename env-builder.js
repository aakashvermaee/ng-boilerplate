require('dotenv').config();

const fs = require('fs');
const path = require('path');

/**
 * Keys in export should match with IEnvironment.
 */
const data = `
import { IEnvironmentConfig } from '@ng-boilerplate/shared';

export const ROOT_ENVIRONMENT: IEnvironmentConfig = {
  production: ${process.env.production},
  BASE_URL: '${process.env.BASE_URL}',
};
`;

fs.writeFileSync(path.join(process.cwd(), 'env.ts'), data, {
  encoding: 'utf8',
});
