import { useEffect, useState } from 'react';
import { TABS } from '../core/constants/tabs';
import { Todo } from '../core/domain/models/Todo';
import { LocalStorageTodoService } from '../core/services/LocalStorageTodo.service';
import { lastView } from '../utils/lastView';

const TodoService = new LocalStorageTodoService();
const initialView = lastView.get();

export const useTodos = () => {
	const [tab, setTab] = useState(initialView);
	const [todoList, setTodoList] = useState<Todo[]>([]);

	const fetchTodos = async (handler: () => Promise<Todo[]>) => {
		const todos = await handler.apply(TodoService);
		const sortedList = LocalStorageTodoService.sortByActive(todos);
		setTodoList(sortedList);
	};

	const updateList = () => {
		if (tab === TABS.ALL) {
			return void fetchTodos(TodoService.getAll);
		}

		if (tab === TABS.ACTIVE) {
			return void fetchTodos(TodoService.getAllActive);
		}

		if (tab === TABS.COMPLETED) {
			return void fetchTodos(TodoService.getAllCompleted);
		}
	};

	const onTodoStatusChange = (id: string) => {
		return async (completed: boolean) => {
			await TodoService.updateTodo({ completed, id });
			updateList();
		};
	};

	const handleAdd = async (label: string) => {
		await TodoService.addTodo({ label });
		updateList();
	};

	const handleRemove = async (id?: string) => {
		let msg = 'Are you sure you want to delete this task?';
		if (!id) msg = 'Are you sure you want to delete all tasks?';

		const handler = id
			? TodoService.deleteTodo
			: TodoService.deleteAllCompleted;

		if (!confirm(msg)) return;

		await handler.bind(TodoService)({ id: id as string });
		updateList();
	};

	const handleSetTab = (name: TABS) => {
		setTab(name);
		lastView.set(name);
	};

	useEffect(() => {
		updateList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tab]);

	return {
		remove: handleRemove,
		add: handleAdd,
		todos: todoList,
		changeStatus: onTodoStatusChange,
		tab,
		setTab: handleSetTab,
	};
};
