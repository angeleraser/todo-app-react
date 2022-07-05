import React from 'react';
import { AppButton } from '../AppButton';
import { Checkbox } from '../Checkbox';
import './styles.scss';

interface TodoItemProps {
	label: string;
	id: string;
	removable?: boolean;
	completed: boolean;
	onStatusChange: (completed: boolean) => void;
}

export const TodoItem = (props: TodoItemProps) => {
	return (
		<div className='todo-item'>
			<div className='todo-item__checkbox'>
				<Checkbox
					id={props.id}
					label={props.label}
					onChange={props.onStatusChange}
					defaultValue={props.completed}
				/>
			</div>

			{props.removable ? (
				<div className='todo-item__actions'>
					<AppButton
						icon='delete_outline'
						iconColor='gray'
						withoutBoxShadow
						padding='none'
					/>
				</div>
			) : null}
		</div>
	);
};
