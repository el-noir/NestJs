import { Controller, Get } from "@nestjs/common";

@Controller('/users')
export class UsersController{
  @Get('/profile')
  getProfile(){
    return new Promise((resolve)=>{
      resolve({name: "Mudasir Shah", age: 22});

    })
  }
}