import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

export class CreateTodoDto {
  description: string;
  is_completed?: boolean; // Optional with default handled in service
}

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todosRepository: Repository<Todo>,
  ) {}

  // get all todos
  async findAll(): Promise<Todo[]> {
    return await this.todosRepository.find();
  }

  // get single todo
  async findOne(id: number): Promise<Todo> {
    return await this.todosRepository.findOne({ where: { id } });
  }

  // create todo
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(todo);
  }

  // update todo
  async update(id: number, todo: Todo): Promise<Todo> {
    await this.todosRepository.update(id, todo);
    return await this.todosRepository.findOne({ where: { id } });
  }

  // delete todo
  async delete(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
