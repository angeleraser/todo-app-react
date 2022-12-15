import React from 'react';

import { TodoContainer } from './components/TodoContainer/TodoContainer';
import { TodoContextProvider } from './contexts/TodoContext';

function App() {
	return (
		<div className='App'>
			<TodoContextProvider>
				<TodoContainer />
			</TodoContextProvider>
		</div>
	);
}

export default App;
