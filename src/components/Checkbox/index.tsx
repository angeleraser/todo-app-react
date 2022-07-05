import React, { useState } from 'react';
import './styles.scss';

interface CheckboxProps {
	label: string;
	id: string;
	defaultValue?: boolean;
	onChange: (value: boolean) => void;
}

export const Checkbox = (props: CheckboxProps) => {
	const [checked, setChecked] = useState(Boolean(props.defaultValue));

	const handleOnChange = (value: boolean) => {
		setChecked(value);
		props.onChange(value);
	};

	return (
		<div className='checkbox'>
			<input
				className='checkbox__input'
				id={props.id}
				type='checkbox'
				checked={checked}
				onChange={(event) => handleOnChange(event.target.checked)}
			/>

			<label className='checkbox__label' htmlFor={props.id}>
				<span className='checkbox__label__check'></span>
				<p className='checkbox__label__text'>{props.label}</p>
			</label>
		</div>
	);
};
