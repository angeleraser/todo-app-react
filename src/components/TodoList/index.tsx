import './styles.scss';
import { TABS } from '../../core/constants/tabs';
import { Todo } from '../../core/domain/models/Todo';
import { TodoContext } from '../../contexts/TodoContext';
import { TodoItem } from '../TodoItem';
import React, { useContext } from 'react';
import { getEmptyTodoListMessage } from '../../utils/getEmptyTodoListMessage';

interface TodoListProps {
	items: Todo[];
	onRemove: (id: string) => void;
	onChangeStatus: (id: string) => (completed: boolean) => void;
}

export const TodoList = (props: TodoListProps) => {
	const { currentView } = useContext(TodoContext);

	return (
		<div className='todo-list'>
			{props.items.map(({ id, completed, label }) => {
				return (
					<TodoItem
						completed={completed}
						id={id}
						key={id}
						label={label}
						onRemove={props.onRemove}
						onStatusChange={props.onChangeStatus(id)}
						removable={currentView === TABS.COMPLETED}
					/>
				);
			})}

			{!props.items.length ? (
				<p className='todo-list__empty-message'>
					{getEmptyTodoListMessage(currentView)}
				</p>
			) : null}
		</div>
	);
};
