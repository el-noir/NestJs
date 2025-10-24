import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { CreateUserDTO } from "./dto";

const USERS: CreateUserDTO[] = [];

@Controller("/users")
export class UserController {
   
    @Post()
    addUser(@Body() createUserDto: CreateUserDTO) {
        USERS.push(createUserDto);
        return 'User Added'
    }

    @Get()
    getUsers(){
        return USERS
    }

    @Get(":id")
    getAUser(@Param('id') id: number){
        return USERS.find((user)=> user.id ==+id)
    }
}

