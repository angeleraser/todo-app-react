import { TABS } from '../core/constants/tabs';

const getEmptyTodoListMessage = (view: TABS): string => {
	if (view === TABS.ALL) return 'You have no tasks, try to add one';

	if (view === TABS.ACTIVE) return 'You have no active tasks yet';

	if (view === TABS.COMPLETED)
		return 'You have not completed tasks, go ahead and complete some tasks';

	throw new Error('');
};

export { getEmptyTodoListMessage };
