import { PORT } from './env';
import app from './app';
import { AppDataSource } from './db';

async function main() {
  await AppDataSource.initialize();
  app.listen(PORT);
  console.log(`Server is running on port ${PORT} ✅`);
}

main();
