import { createContext } from 'react';
import { TABS } from '../core/constants/tabs';

export const TodoContext = createContext({ currentView: '' as TABS });
