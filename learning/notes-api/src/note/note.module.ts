import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
@Module({
  imports: [AuthModule],
  controllers: [NoteController],
  providers: [NoteService, PrismaService],
})
export class NoteModule {}
