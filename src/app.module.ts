import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './db/data-source';
import { EmailModule } from './email/email.module';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CacheService } from './cache/cache.service';
import { CacheController } from './cache/cache.controller';

@Module({
  imports: [
    LostPetsModule,
    EmailModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, CacheController],
  providers: [AppService, CacheService],
})
export class AppModule {}
