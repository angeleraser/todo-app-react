import React, { useEffect, useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TabBar } from './components/TabBar';
import { TodoItem } from './components/TodoItem';
// import { Todo } from './core/domain/models/Todo';
import { LocalStorageTodoService } from './core/services/LocalStorageTodo.service';

const TAB_ACTIONS = ['All', 'Active', 'Completed'];
const initialAction = TAB_ACTIONS[0];

const TodoService = new LocalStorageTodoService();

function App() {
	const [currentView, setCurrentView] = useState(initialAction);
	// const [todoList, setTodoList] = useState<Todo[]>([]);

	const handleAddTodo = (label: string) => {
		console.log(label);
	};

	useEffect(() => {
		if (currentView === 'All') {
			console.log(TodoService.getAll);
		}

		if (currentView === 'Active') {
			console.log(TodoService.getAllActive);
		}

		if (currentView === 'Completed') {
			console.log(TodoService.getAllCompleted);
		}
	}, [currentView]);

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

				<h1>{currentView}</h1>

				<div className='todo-content__list'>
					<TodoItem
						id='todo-1'
						label='Do coding challenges'
						removable={currentView === 'Completed'}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
