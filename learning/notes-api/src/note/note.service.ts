import { ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NoteService {
  private logger = new Logger(NoteService.name);
  
  constructor(private readonly prismaService: PrismaService) {}


  async create(createNoteDto: CreateNoteDto, userId: number) {
    const note = await this.prismaService.note.create({
      data: {
        title: createNoteDto.title,
        body: createNoteDto.content ?? '',
        userId: userId
      }
    })
    this.logger.log(`Note created with ID: ${note.id} for User ID: ${userId}`);
    return note;
  }

  async findAll({take, skip}: {take: number, skip: number}, userId: number) {
    const notes = await this.prismaService.note.findMany({
      where: { userId: userId },
      take,
      skip
    });
    this.logger.log(`Retrieved ${notes.length} notes for User ID: ${userId}`);
    return notes;
  }

  async findOne(id: number, userId: number) {
    const note = await this.prismaService.note.findFirst({where: {id}});
    if(!note){
      throw new NotFoundException("Note not found");
    }
    if(note?.userId !==userId){
      throw new ForbiddenException("You do not have access to this note");
    }
    return note;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
