import { TABS } from '../core/constants/tabs';

const lastView = {
	get() {
		return (localStorage.getItem('TODO_LAST_VIEW') as TABS) || TABS.ALL;
	},

	set(view: TABS) {
		localStorage.setItem('TODO_LAST_VIEW', view);
	},
};

export { lastView };
