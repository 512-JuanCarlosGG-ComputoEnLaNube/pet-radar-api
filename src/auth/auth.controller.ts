import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('register')
    async register(
        @Body() dto: CreateUserDto
    ){
        const id = await this.authService.register(dto);
        return {
            token: id
        }
    }
}
