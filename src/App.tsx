import React, { useState, useEffect } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { AppButton } from './components/AppButton';
import { TabBar } from './components/TabBar';
import { TodoList } from './components/TodoList';
import { TodoProvider } from './contexts/TodoContext';
import { TABS } from './core/constants/tabs';
import { Todo } from './core/domain/models/Todo';
import { LocalStorageTodoService } from './core/services/LocalStorageTodo.service';
import { lastView } from './utils/lastView';

const TAB_ACTIONS = [TABS.ALL, TABS.ACTIVE, TABS.COMPLETED];
const initialView = lastView.get();

const TodoService = new LocalStorageTodoService();

function App() {
	const [currentView, setCurrentView] = useState<TABS>(initialView);
	const [todoList, setTodoList] = useState<Todo[]>([]);

	const fetchTodos = async (handler: () => Promise<Todo[]>) => {
		const todos = await handler.apply(TodoService);
		const sortedList = LocalStorageTodoService.sortByActive(todos);
		setTodoList(sortedList);
	};

	const updateList = () => {
		if (currentView === TABS.ALL) {
			return void fetchTodos(TodoService.getAll);
		}

		if (currentView === TABS.ACTIVE) {
			return void fetchTodos(TodoService.getAllActive);
		}

		if (currentView === TABS.COMPLETED) {
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
		setCurrentView(name);
		lastView.set(name);
	};

	useEffect(updateList, [currentView]);

	return (
		<TodoProvider value={{ currentView }}>
			<div className='App'>
				<div className='todo-content'>
					<h1 className='todo-content__title'>#todo</h1>

					<TabBar
						actions={TAB_ACTIONS}
						onSelectAction={handleSetTab}
						initialAction={initialView}
					/>

					{currentView !== TABS.COMPLETED ? (
						<AddTodoForm onSubmit={handleAdd} />
					) : null}

					<TodoList
						items={todoList}
						onRemove={handleRemove}
						onChangeStatus={onTodoStatusChange}
					/>

					{todoList.length && currentView === TABS.COMPLETED ? (
						<AppButton
							label='delete all'
							icon='delete_outline'
							color='negative'
							padding='m'
							className='delete-all-btn'
							onClick={() => handleRemove()}
						/>
					) : null}
				</div>
			</div>
		</TodoProvider>
	);
}

export default App;
