import * as dotenv from 'dotenv';
import * as fs from 'node:fs';

if (fs.existsSync('.env')) {
  dotenv.config({ path: '.env' });
}

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
}
