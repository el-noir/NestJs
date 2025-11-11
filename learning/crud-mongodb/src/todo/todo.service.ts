import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ToDo } from './todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
    constructor(@InjectModel(ToDo.name) private readonly todoModel: Model<ToDo>) {}

    async findAll(): Promise<ToDo[]> {
        return this.todoModel.find().exec();
    }

    async findOne(id: string): Promise<ToDo>{
        const todo = await this.todoModel.findById(id).exec();

        if(!todo){
            throw new NotFoundException('Todo not found');
        }
        return todo;
    }

    async create(data: Partial<ToDo>): Promise<ToDo>{
        const newTodo = new this.todoModel(data);
        await newTodo.save();
        return newTodo ;
    }

    async update(id: string, data: Partial<ToDo>): Promise<ToDo> {
        const updatedTodo = await this.todoModel.findByIdAndUpdate(id, data, {new: true})
        .exec();

        if(!updatedTodo){
            throw new NotFoundException('Todo not found')
        }

        return updatedTodo;
    }

    async delete(id: string): Promise<void>{
        const result = await this.todoModel.findByIdAndDelete(id).exec();

        if(!result){
            throw new NotFoundException('Todo not found');
        }
    }
}
