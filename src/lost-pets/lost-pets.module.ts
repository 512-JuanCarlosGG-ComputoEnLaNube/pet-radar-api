import { Module } from '@nestjs/common';
import { LostPetsController } from './lost-pets.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [LostPetsController]
})
export class LostPetsModule {}
  