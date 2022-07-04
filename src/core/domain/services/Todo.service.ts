import { Todo } from '../models/Todo';

interface TodoService {
	getAll(): Promise<Todo[]>;
	getAllCompleted(): Promise<Todo[]>;
	getAllActive(): Promise<Todo[]>;
	addTodo(params: { label: string }): Promise<Todo>;
	deleteTodo(params: { id: string }): Promise<Todo>;
	updateTodo(params: { completed: boolean; id: string }): Promise<Todo>;
}

export type { TodoService };
