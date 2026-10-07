import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';
import { envs } from '../config/envs';
import { PendingEmail } from '../email/entities/pending-email.entity';
import { LostPet } from '../lost-pets/entities/lost-pet.entity';
import { User } from '../users/entities/user-entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  database: envs.DB_NAME,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  entities: [
    LostPet, 
    User, 
    PendingEmail
  ],
  synchronize: false,
  migrationsRun: envs.DB_MIGRATIONS_RUN,
  migrations: [__dirname + '/migrations/*.js'],
};

export const AppDataSource = new DataSource(dataSourceOptions);
