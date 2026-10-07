import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendingEmail } from './entities/pending-email.entity';
import { EmailService } from './email.service';

@Module({
  imports: [TypeOrmModule.forFeature([PendingEmail])],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
