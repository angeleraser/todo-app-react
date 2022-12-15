import { useContext } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import { TABS } from '../../core/constants/tabs';
import { AddTodoForm } from '../AddTodoForm';
import { AppButton } from '../AppButton';
import { TabBar } from '../TabBar';
import { TodoList } from '../TodoList';

const TAB_ACTIONS = [TABS.ALL, TABS.ACTIVE, TABS.COMPLETED];

export function TodoContainer() {
	const { tab, add, todos, remove } = useContext(TodoContext);

	return (
		<div className='App'>
			<div className='todo-content'>
				<h1 className='todo-content__title'>#todo</h1>

				<TabBar actions={TAB_ACTIONS} />

				{tab !== TABS.COMPLETED ? <AddTodoForm onSubmit={add} /> : null}

				<TodoList items={todos} />

				{todos.length && tab === TABS.COMPLETED ? (
					<AppButton
						label='delete all'
						icon='delete_outline'
						color='negative'
						padding='m'
						className='delete-all-btn'
						onClick={() => remove(undefined)}
					/>
				) : null}
			</div>
		</div>
	);
}
