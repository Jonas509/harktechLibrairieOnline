/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';
export const AppDataSource: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  database: 'librairie2',
  username: 'root',
  password: '',
  //synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
const databaseSource = new DataSource(AppDataSource);
databaseSource.initialize();
export default databaseSource;

