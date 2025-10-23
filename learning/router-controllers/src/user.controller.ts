import { Controller, Get, Req } from "@nestjs/common";
import { of } from "rxjs";
import type { Request } from "express";
import { resolve } from "path";
import { rejects } from "assert";

function getNetflixShows(){
  return new Promise((resolve) =>{
    setTimeout(
      () => resolve({shows: ["GOT", "Breaking Bad", "Peaky Blinders"]}),
      5000
    )
  })
}

@Controller('users')
export class UsersController{
  @Get("sync")
  findUsers(){
    return ["Mudasir Shah", "Abdul Bari"];
  }

  @Get("promise")
  findFollowers(){
    return new Promise((resolve, reject)=>{
      setTimeout(
        () => resolve(["Thomas Shelby", "Walter White", "Sam Altman"]),
        5000
      )
    })
  }

  @Get("async")
  async findShows() {
    const shows = await getNetflixShows();
    return shows
  }

  @Get("observables")
  findImages() {
    return of([
      "https://picsum.photos/200",
      "https://picsum.photos/300",
      "https://picsum.photos/400",
    ])
  }
}