import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { VideoController } from './video.controller';

@Module({
  imports: [],
  controllers: [UsersController, VideoController],
})
export class AppModule {}
