import { Body, Controller, Post, Get, Param, Put, Delete } from "@nestjs/common";
import { CreateUserDTO } from "./dto";

let USERS: CreateUserDTO[] = [];

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

    @Put(":id")
    updateUser(@Param('id') id: number, @Body() updateUserDTO: CreateUserDTO){
        const userIndex = USERS.findIndex((user)=> user.id==+id);
        if(!userIndex){
            return;
        }
        USERS[userIndex] = updateUserDTO;
    }

    @Delete(":id")
    deleteUser(@Param('id') id: number){
        USERS = USERS.filter((user)=> user.id != +id);
    }

}

