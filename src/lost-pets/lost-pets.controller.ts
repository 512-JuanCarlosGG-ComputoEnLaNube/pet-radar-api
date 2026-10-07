import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { CreateLostPetDto } from './dtos/create-lost-pet.dto';
import { generateLostPetTemplate } from 'src/lost-pets/templates/lost-pet.template';

@Controller('lost-pets')
export class LostPetsController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async createIncident(
    @Body() createLostPetDto: CreateLostPetDto
  ){
    const template = generateLostPetTemplate(createLostPetDto);
    await this.emailService.sendEmail(template);
    return true;
  }
}
  
