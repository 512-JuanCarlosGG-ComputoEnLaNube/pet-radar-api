import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService
    ) {}

    async register(dto:CreateUserDto) : Promise<number>{
        const id = await this.usersService.create(dto);
        return id;  
    }

    async login() {

    }
}
