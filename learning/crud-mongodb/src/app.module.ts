import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://mudasirshah9777:mudasir434@cluster0.u8x5uxm.mongodb.net/') 
    ,TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
