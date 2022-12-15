/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext } from 'react';
import { TABS } from '../core/constants/tabs';
import { Todo } from '../core/domain/models/Todo';
import { useTodos } from '../hooks/useTodos';
import { lastView } from '../utils/lastView';
const initialView = lastView.get();

export interface TodoContext {
	tab: TABS;
	setTab: CallableFunction;
	remove: (id?: string | undefined) => Promise<void>;
	add: (label: string) => Promise<void>;
	todos: Todo[];
	changeStatus: (id: string) => (completed: boolean) => Promise<void>;
}

export const TodoContext = createContext<TodoContext>({
	tab: initialView,
	todos: [],
	setTab: (v: TABS) => void 0,
	remove: function (id?: string | undefined): Promise<void> {
		throw new Error('Function not implemented.');
	},
	add: function (label: string): Promise<void> {
		throw new Error('Function not implemented.');
	},
	changeStatus: function (id: string): (completed: boolean) => Promise<void> {
		throw new Error('Function not implemented.');
	},
});

export const TodoContextProvider = (props: { children: React.ReactNode }) => {
	const state = useTodos();

	return (
		<TodoContext.Provider value={state}>{props.children}</TodoContext.Provider>
	);
};
