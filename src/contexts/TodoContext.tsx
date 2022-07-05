import { createContext, ReactNode } from 'react';
import { TABS } from '../core/constants/tabs';

export const TodoContext = createContext({ currentView: '' as TABS });

interface TodoProviderProps {
	children: ReactNode;
	value: { currentView: TABS };
}

export const TodoProvider = (props: TodoProviderProps) => {
	return (
		<TodoContext.Provider value={props.value}>
			{props.children}
		</TodoContext.Provider>
	);
};
