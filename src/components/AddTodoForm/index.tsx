import React, { FormEvent, useState } from 'react';
import { AppButton } from '../AppButton';
import './styles.scss';

interface AddTodoFormProps {
	onSubmit: (todoLabel: string) => void;
}

export const AddTodoForm = ({ onSubmit }: AddTodoFormProps) => {
	const [todoLabel, setTodoLabel] = useState('');

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(todoLabel);
		setTodoLabel('');
	};
	return (
		<form onSubmit={handleSubmit} className='add-todo-form'>
			<input
				value={todoLabel}
				onChange={(event) => setTodoLabel(event.target.value)}
				placeholder='add details'
			/>

			<AppButton label='Add' color='blue' padding='m' />
		</form>
	);
};
