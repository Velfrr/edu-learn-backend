import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { resolve, extname } from 'node:path';

import { entities } from './entities';

dotenv.config();

const config = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: +config.get<number>('DB_PORT')!,
  username: config.get('DB_USER'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_NAME'),
  entities,
  migrations: [resolve(__dirname, `./migrations/**/*${extname(__filename)}`)],
  ssl: {
    rejectUnauthorized: false,
  },
});
