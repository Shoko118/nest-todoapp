import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

class TodoDto {
  description: string;
  is_completed?: boolean; // Correctly marked as optional
}

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // get all todos
  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  // get single todo
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Todo> {
    const todo = await this.todosService.findOne(id);

    if (!todo) throw new Error('Todo not found!!');

    return todo;
  }

  // create todo
  @Post()
  async createTodo(@Body() createTodoDto: TodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  // update todo
  @Put(':id')
  async updateTodo(@Param('id') id: number, @Body() todo: Todo) {
    return await this.todosService.update(id, todo);
  }

  // delete todo
  @Delete(':id')
  async deleteTodo(id): Promise<void> {
    const todo = await this.todosService.findOne(id);

    if (!todo) throw new Error('Delete todo not found');

    return await this.todosService.delete(id);
  }
}
