import './styles.scss';
import { TABS } from '../../core/constants/tabs';
import { Todo } from '../../core/domain/models/Todo';
import { TodoItem } from '../TodoItem';
import React from 'react';

interface TodoListProps {
	items: Todo[];
	onRemove: (id: string) => void;
	onChangeStatus: (id: string) => (completed: boolean) => void;
	emptyMsg: string;
	selectedTab: TABS;
}

export const TodoList = (props: TodoListProps) => {
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
						removable={props.selectedTab === TABS.COMPLETED}
					/>
				);
			})}

			{!props.items.length ? (
				<p className='todo-list__empty-message'>{props.emptyMsg}</p>
			) : null}
		</div>
	);
};
