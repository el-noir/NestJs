import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async register(registerDto: RegisterDto){
       
        const user = await this.userService.getUserByEmail(registerDto.email);

        if(user){
            throw new ConflictException("Email Already Exists");
        }

        return user
    }
}
