import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async getUserByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });
        return user;
    }
    async checkRole(userId: number, role: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });
        return user?.role === role;
    }
       async createUser(registerDto: RegisterDto){
        const data = {
            ...registerDto,
            role: registerDto.role as any,
        };
        return await this.prismaService.user.create({ data });
    }
    }
