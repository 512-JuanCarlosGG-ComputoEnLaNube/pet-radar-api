import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user-entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(dto:CreateUserDto) : Promise<number>{
         const exists = await this.userRepository.findOne({where:{email:dto.email}});
         if(exists){throw new ConflictException('User already exists');}
         const hashedPassword = await bcrypt.hash(dto.password, 10);
         const user = this.userRepository.create({
            name: dto.name,
            lastName: dto.lastName,
            password: hashedPassword,
            email: dto.email,
            radius: dto.radius,
            isPetAlertEnabled: dto.isPetAlertEnabled,
            location: {
                type: 'Point',
                coordinates: [dto.lon, dto.lat]
            }
         });
         const saved = await this.userRepository.save(user);
         return saved.id;
    }

    async validate(email: string, password: string): Promise<number | null> {
        const exists = await this.userRepository.findOneBy({ email });
        if (!exists) return null;

        const isValid = await bcrypt.compare(password, exists.password);
        if (!isValid) return null;
        return exists.id;
    }
}
