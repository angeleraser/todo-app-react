import React from 'react';
import './styles.scss';

interface CheckboxProps {
	label: string;
	id: string;
}

export const Checkbox = (props: CheckboxProps) => {
	return (
		<div className='checkbox'>
			<input className='checkbox__input' id={props.id} type='checkbox' />
			<label className='checkbox__label' htmlFor={props.id}>
				<span className='checkbox__label__check'></span>
				<span className='checkbox__label__text'>{props.label}</span>
			</label>
		</div>
	);
};
