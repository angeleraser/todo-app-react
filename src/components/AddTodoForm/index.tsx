import React, { FormEvent, useRef } from 'react';
import { AppButton } from '../AppButton';
import './styles.scss';

interface AddTodoFormProps {
	onSubmit: (todoLabel: string) => void;
}

export const AddTodoForm = ({ onSubmit }: AddTodoFormProps) => {
	const labelRef = useRef<HTMLInputElement | null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(labelRef.current?.value as string);
		labelRef.current && (labelRef.current.value = '');
	};

	return (
		<form onSubmit={handleSubmit} className='add-todo-form'>
			<input
				className='add-todo-form__input'
				required
				ref={labelRef}
				placeholder='add details'
				maxLength={64}
			/>

			<AppButton label='Add' color='blue' padding='m' />
		</form>
	);
};
