const classNames = (deps: { [key: string]: boolean }) => {
	const classesStr = Object.entries(deps)
		.map((item) => {
			const [key, value] = item;

			if (!value || !key) return '';

			return key;
		})
		.join(' ');

	if (!classesStr.length) return '';

	return ` ${classesStr}`;
};

export { classNames };
