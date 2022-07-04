import { Todo } from '../domain/models/Todo';
import { TodoService } from '../domain/services/Todo.service';

class LocalStorageTodoService implements TodoService {
	private COLLECTION_KEY: string;
	private __collection: Array<Todo> = [];

	constructor() {
		this.COLLECTION_KEY = 'TODO_COLLECTION';
		this.initLocalStorage();
	}

	public async addTodo(params: { label: string }): Promise<Todo> {
		const newTodo: Todo = {
			id: String(Date.now()),
			completed: false,
			label: params.label,
		};

		this.collection = [newTodo, ...this.collection];

		return newTodo;
	}

	public async deleteTodo(params: { id: string }): Promise<Todo> {
		const deletedItem = this.collection.find((item) => item.id === params.id);
		this.collection = this.collection.filter((item) => item.id !== params.id);
		return deletedItem as Todo;
	}

	public async updateTodo(params: {
		completed: boolean;
		id: string;
	}): Promise<Todo> {
		const collection = this.collection;

		let selectedTodo: Todo | null = null;

		this.collection = collection.map((item) => {
			if (item.id === params.id) {
				selectedTodo = {
					...item,
					completed: params.completed,
				};

				return selectedTodo;
			}

			return item;
		});

		return selectedTodo as unknown as Todo;
	}

	public async getAll(): Promise<Todo[]> {
		return this.__collection;
	}

	public async getAllCompleted(): Promise<Todo[]> {
		return this.__collection.filter((item) => item.completed);
	}

	public async getAllActive(): Promise<Todo[]> {
		return this.__collection.filter((item) => !item.completed);
	}

	private initLocalStorage() {
		const collection = JSON.parse(
			localStorage.getItem(this.COLLECTION_KEY) || 'null',
		) as Array<Todo> | null;

		if (collection === null) {
			return localStorage.setItem(this.COLLECTION_KEY, JSON.stringify([]));
		}

		this.collection = collection;
	}

	private set collection(value: Todo[]) {
		this.__collection = value;

		localStorage.setItem(
			this.COLLECTION_KEY,
			JSON.stringify(this.__collection),
		);
	}

	private get collection() {
		const collection = JSON.parse(
			localStorage.getItem(this.COLLECTION_KEY) as string,
		) as null | Todo[];

		if (!collection) return [];

		return collection;
	}
}

export { LocalStorageTodoService };
