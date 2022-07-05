import React, { useEffect, useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TabBar } from './components/TabBar';
import { TodoItem } from './components/TodoItem';
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

	const handleTodoStatusChange = (todo: Todo) => {
		return (completed: boolean) => {
			TodoService.updateTodo({ completed, id: todo.id });
			updateTodoList();
		};
	};

	const handleAddTodo = (label: string) => {
		TodoService.addTodo({ label });
		updateTodoList();
	};

	const handleRemoveTodo = (id: string) => {
		TodoService.deleteTodo({ id });
		updateTodoList();
	};
	useEffect(updateTodoList, [currentView]);

	return (
		<div className='App'>
			<div className='todo-content'>
				<h1 className='todo-content__title'>#todo</h1>

				<TabBar
					actions={TAB_ACTIONS}
					onSelectAction={setCurrentView}
					initialAction={initialAction}
				/>

				<AddTodoForm onSubmit={handleAddTodo} />

				<div className='todo-content__list'>
					{todoList.map((todo) => {
						return (
							<TodoItem
								completed={todo.completed}
								id={todo.id}
								key={todo.id}
								label={todo.label}
								removable={currentView === TABS.COMPLETED}
								onStatusChange={handleTodoStatusChange(todo)}
								onRemove={handleRemoveTodo}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
