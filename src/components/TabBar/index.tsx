import React, { useContext } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import { TABS } from '../../core/constants/tabs';
import { classNames } from '../../utils/classNames';
import './styles.scss';

interface TabBarProps {
	actions: Array<TABS>;
}

export const TabBar = (props: TabBarProps) => {
	const { tab, setTab } = useContext(TodoContext);

	const handleSelectAction = (action: TABS) => {
		setTab(action);
	};

	return (
		<div className='tab-bar'>
			<div className='tab-bar__actions'>
				{props.actions.map((label, indx) => (
					<button
						className={`tab-bar__actions__item${classNames({
							'tab-bar__actions__item--active': tab === label,
						})}`}
						key={indx}
						onClick={() => handleSelectAction(label)}
					>
						{label}
					</button>
				))}
			</div>

			<span className='tab-bar__indicator'></span>
		</div>
	);
};
