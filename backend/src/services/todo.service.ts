import { Todo } from '../entities/todo.entity';
import { AppDataSource } from '../db';

class CreateTodoDto {
  description: string;
  is_completed?: boolean;
}

export class TodoService {
  private todoRepository = AppDataSource.getRepository(Todo);

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) throw new Error('Todo not found');
    return todo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(todo);
  }

  async update(id: number, updateTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new Error('Todo not found');
    }

    // Only update fields that are provided
    if (updateTodoDto.description !== undefined) {
      todo.description = updateTodoDto.description;
    }

    if (updateTodoDto.is_completed !== undefined) {
      todo.is_completed = updateTodoDto.is_completed;
    }

    await this.todoRepository.save(todo);
    return todo;
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.todoRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new Error('Todo not found');
    }
  }
}
