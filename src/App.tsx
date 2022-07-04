import React, { useState } from 'react';
import { AddTodoForm } from './components/AddTodoForm';
import { TabBar } from './components/TabBar';

const TAB_ACTIONS = ['All', 'Active', 'Completed'];
const initialAction = TAB_ACTIONS[0];

function App() {
	const [currentView, setCurrentView] = useState(initialAction);

	const handleAddTodo = (label: string) => {
		console.log(label);
	};

	return (
		<div className='App'>
			<div className='todo-content'>
				<h1 className='todo-content__title'>#todo</h1>

				<TabBar
					actions={TAB_ACTIONS}
					onSelectAction={(value) => setCurrentView(value)}
					initialAction={initialAction}
				/>

				<h1>{currentView}</h1>

				<AddTodoForm onSubmit={handleAddTodo} />
			</div>
		</div>
	);
}

export default App;
