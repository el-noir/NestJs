import { IsNotEmpty, IsEmail, IsString, IsStrongPassword } from "class-validator";

export class RegisterDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsNotEmpty()
    role: string;
}