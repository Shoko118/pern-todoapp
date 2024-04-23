import { DataSource } from 'typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './env';
import { Todo } from '../src/entities/todo.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_DATABASE,
  entities: [Todo],
});
