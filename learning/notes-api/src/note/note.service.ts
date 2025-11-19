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

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    const note = await this.prismaService.note.findFirst({where: {id}});
    if(!note){
      throw new NotFoundException("Note not found");
    }
    if(note?.userId !==userId){
      throw new ForbiddenException("You do not have access to this note");
    }
    const data: any = {};
    if (updateNoteDto.title !== undefined) data.title = updateNoteDto.title;
    if ((updateNoteDto as any).content !== undefined) data.body = (updateNoteDto as any).content;

    const updatedNote = await this.prismaService.note.update({
      where: { id },
      data,
    });
    return updatedNote;
  }

  async remove(id: number, userId: number) {
    const note = await this.prismaService.note.findFirst({ where: { id } });
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    if (note.userId !== userId) {
      throw new ForbiddenException('You do not have access to this note');
    }
    const deleted = await this.prismaService.note.delete({ where: { id } });
    this.logger.log(`Note deleted with ID: ${id} by User ID: ${userId}`);
    return deleted;
  }
}
