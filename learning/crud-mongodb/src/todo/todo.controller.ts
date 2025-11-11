import { Controller } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ToDo } from './todo.schema';
import {Get, Post, Put, Delete, Body, Param} from "@nestjs/common"

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){}

    @Get()
    async findAll(): Promise<ToDo[]>{
        return this.todoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ToDo>{
        return this.todoService.findOne(id);
    }    

    @Post()
    async create(@Body() data: Partial<ToDo>): Promise<ToDo>{
        this.todoService.create(data);
        return data as ToDo;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<ToDo>): Promise<ToDo>{
        return this.todoService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void>{
        return this.todoService.delete(id);
    }
}
