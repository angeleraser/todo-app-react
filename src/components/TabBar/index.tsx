import React, { useState } from 'react';
import { TABS } from '../../core/constants/tabs';
import { classNames } from '../../utils/classNames';
import './styles.scss';

interface TabBarProps {
	actions: Array<TABS>;
	onSelectAction?: (currentAction: TABS) => void;
	initialAction: string;
}

export const TabBar = (props: TabBarProps) => {
	const [activeAction, setActiveAction] = useState(props.initialAction);

	const handleSelectAction = (action: TABS) => {
		setActiveAction(action);
		if (props.onSelectAction) props.onSelectAction(action);
	};

	return (
		<div className='tab-bar'>
			<div className='tab-bar__actions'>
				{props.actions.map((label, indx) => (
					<button
						className={`tab-bar__actions__item${classNames({
							'tab-bar__actions__item--active': activeAction === label,
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
