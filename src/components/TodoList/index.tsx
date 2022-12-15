import './styles.scss';
import { TABS } from '../../core/constants/tabs';
import { TodoItem } from '../TodoItem';
import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import { getEmptyTodoListMessage } from '../../utils/getEmptyTodoListMessage';
import { Todo } from '../../core/domain/models/Todo';

export const TodoList = ({ items }: { items: Todo[] }) => {
	const { tab, changeStatus, remove } = useContext(TodoContext);

	return (
		<div className='todo-list'>
			{items.map(({ id, completed, label }) => {
				return (
					<TodoItem
						completed={completed}
						id={id}
						key={id}
						label={label}
						onRemove={remove}
						onStatusChange={changeStatus(id)}
						removable={tab === TABS.COMPLETED}
					/>
				);
			})}

			{!items.length ? (
				<p className='todo-list__empty-message'>
					{getEmptyTodoListMessage(tab)}
				</p>
			) : null}
		</div>
	);
};
