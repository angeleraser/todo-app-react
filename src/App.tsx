import React, { useEffect, useState } from 'react';
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
const initialViiew = lastView.get();

const TodoService = new LocalStorageTodoService();

function App() {
	const [currentView, setCurrentView] = useState<TABS>(initialViiew);
	const [todoList, setTodoList] = useState<Todo[]>([]);

	const fetchTodos = async (handler: () => Promise<Todo[]>) => {
		const todos = await handler.apply(TodoService);
		const sortedList = LocalStorageTodoService.sortByActive(todos);
		setTodoList(sortedList);
	};

	const updateTodoList = () => {
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

	const handleTodoStatusChange = (id: string) => {
		return async (completed: boolean) => {
			await TodoService.updateTodo({ completed, id });
			updateTodoList();
		};
	};

	const handleAddTodo = async (label: string) => {
		await TodoService.addTodo({ label });
		updateTodoList();
	};

	const handleRemoveTodo = async (id: string) => {
		const isConfirmed = confirm('Are you sure you want to delete this task?');

		if (!isConfirmed) return;

		await TodoService.deleteTodo({ id });
		updateTodoList();
	};

	const handleRemoveAllCompletedTodos = async () => {
		const isConfirmed = confirm('Are you sure you want to delete all tasks?');

		if (!isConfirmed) return;

		await TodoService.deleteAllCompleted();
		updateTodoList();
	};

	const contextValue = {
		currentView,
	};

	useEffect(() => {
		updateTodoList();
		lastView.set(currentView);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentView]);

	return (
		<TodoProvider value={contextValue}>
			<div className='App'>
				<div className='todo-content'>
					<h1 className='todo-content__title'>#todo</h1>

					<TabBar
						actions={TAB_ACTIONS}
						onSelectAction={setCurrentView}
						initialAction={initialViiew}
					/>

					{currentView !== TABS.COMPLETED ? (
						<AddTodoForm onSubmit={handleAddTodo} />
					) : null}

					<TodoList
						items={todoList}
						onRemove={handleRemoveTodo}
						onChangeStatus={handleTodoStatusChange}
					/>

					{todoList.length && currentView === TABS.COMPLETED ? (
						<AppButton
							label='delete all'
							icon='delete_outline'
							color='negative'
							padding='m'
							className='delete-all-btn'
							onClick={handleRemoveAllCompletedTodos}
						/>
					) : null}
				</div>
			</div>
		</TodoProvider>
	);
}

export default App;
