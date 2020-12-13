require('dotenv').config();

const fs = require('fs');
const path = require('path');

const data = `export const ROOT_ENVIRONMENT = {
  production: ${process.env.production || false},
};
`;

fs.writeFileSync(path.join(process.cwd(), 'env.ts'), data, {
  encoding: 'utf8',
});
