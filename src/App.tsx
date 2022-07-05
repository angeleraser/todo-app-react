import React, { useEffect, useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TabBar } from './components/TabBar';
import { TodoList } from './components/TodoList';
import { TodoContext } from './contexts/TodoContext';
import { TABS } from './core/constants/tabs';
import { Todo } from './core/domain/models/Todo';
import { LocalStorageTodoService } from './core/services/LocalStorageTodo.service';

const TAB_ACTIONS = [TABS.ALL, TABS.ACTIVE, TABS.COMPLETED];
const initialAction = TABS.ALL;

const TodoService = new LocalStorageTodoService();

function App() {
	const [currentView, setCurrentView] = useState(initialAction);
	const [todoList, setTodoList] = useState<Todo[]>([]);

	const fetchTodos = async (handler: () => Promise<Todo[]>) => {
		const todos = await handler.apply(TodoService);
		setTodoList(todos);
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
		return (completed: boolean) => {
			TodoService.updateTodo({ completed, id });
			updateTodoList();
		};
	};

	const handleAddTodo = (label: string) => {
		TodoService.addTodo({ label });
		updateTodoList();
	};

	const handleRemoveTodo = (id: string) => {
		const isConfirmed = confirm('Are you sure you want to delete this task?');

		if (!isConfirmed) return;

		TodoService.deleteTodo({ id });
		updateTodoList();
	};

	const contextValue = {
		currentView,
	};

	useEffect(updateTodoList, [currentView]);

	return (
		<TodoContext.Provider value={contextValue}>
			<div className='App'>
				<div className='todo-content'>
					<h1 className='todo-content__title'>#todo</h1>

					<TabBar
						actions={TAB_ACTIONS}
						onSelectAction={setCurrentView}
						initialAction={initialAction}
					/>

					<AddTodoForm onSubmit={handleAddTodo} />

					<TodoList
						items={todoList}
						onRemove={handleRemoveTodo}
						onChangeStatus={handleTodoStatusChange}
					/>
				</div>
			</div>
		</TodoContext.Provider>
	);
}

export default App;
