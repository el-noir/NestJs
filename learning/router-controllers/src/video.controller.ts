import { Controller, Get, Param, Query } from "@nestjs/common";

interface VideoParams {
    id: number;
    name: string;
}

@Controller('video-controller')
export class VideoController{
    // Route Parameters

    // @Get('/videos/:id/:name')
    // getVideos(@Param() params : VideoParams){
    //     console.log(params)
    //     return "Success"
    // }


    // Query Parameters

    @Get('/videos')
    getVideos(@Query() query: Record<string, any>){
        console.log(query);
        return "Success"
    }
}
