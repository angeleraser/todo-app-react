import React from 'react';
import { classNames } from '../../utils/classNames';
import './styles.scss';

interface AppButtonProps {
	label?: string;
	icon?: string;
	color?: string;
	padding?: string;
	withoutBoxShadow?: boolean;
	iconColor?: string;
	transparent?: boolean;
}

export const AppButton = (props: AppButtonProps) => {
	const classObj = {
		'app-button--no-box-shadow': !!props.withoutBoxShadow,
		'app-button--transparent': !!props.transparent,
		[`app-button--${props.color}`]: !!props.color,
		[`app-button--padding-${props.padding}`]: !!props.padding,
	};

	return (
		<button className={`app-button${classNames(classObj)}`}>
			{props.icon ? (
				<span
					className={`app-button__icon${classNames({
						[`app-button__icon--${props.iconColor}`]: !!props.iconColor,
					})}`}
				>
					<span className='material-icons'>{props.icon}</span>
				</span>
			) : null}

			{props.label ? (
				<span className='app-button__text'>{props.label}</span>
			) : null}
		</button>
	);
};
