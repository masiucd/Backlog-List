export const data = [
	{ id: 1, name: "Europe", parentId: null },
	{ id: 2, name: "Asia", parentId: null },
	{ id: 3, name: "Africa", parentId: null },
	{ id: 4, name: "North America", parentId: null },
	{ id: 5, name: "South America", parentId: null },
	{ id: 6, name: "Oceania", parentId: null },
	{ id: 7, name: "Antarctica", parentId: null },
	{ id: 8, name: "Albania", parentId: 1 },
	{ id: 9, name: "Andorra", parentId: 1 },
	{ id: 10, name: "Austria", parentId: 1 },
	{ id: 11, name: "Belarus", parentId: 1 },
	{ id: 12, name: "Belgium", parentId: 1 },
	{ id: 13, name: "Bosnia and Herzegovina", parentId: 1 },
	{ id: 14, name: "Bulgaria", parentId: 1 },
	{ id: 15, name: "Croatia", parentId: 1 },
	{ id: 16, name: "Cyprus", parentId: 1 },
	{ id: 17, name: "Czech Republic", parentId: 1 },
	{ id: 18, name: "Denmark", parentId: 1 },
	{ id: 19, name: "Estonia", parentId: 1 },
	{ id: 20, name: "Finland", parentId: 1 },
	{ id: 21, name: "France", parentId: 1 },
	{ id: 22, name: "Germany", parentId: 1 },
	{ id: 23, name: "Greece", parentId: 1 },
	{ id: 24, name: "Hungary", parentId: 1 },
	{ id: 25, name: "Iceland", parentId: 1 },
	{ id: 26, name: "Ireland", parentId: 1 },
	{ id: 27, name: "Italy", parentId: 1 },
	{ id: 28, name: "Kosovo", parentId: 1 },
	{ id: 29, name: "Latvia", parentId: 1 },
	{ id: 30, name: "Liechtenstein", parentId: 1 },
	{ id: 31, name: "Lithuania", parentId: 1 },
	{ id: 32, name: "Luxembourg", parentId: 1 },
	{ id: 33, name: "Malta", parentId: 1 },
	{ id: 34, name: "Moldova", parentId: 1 },
	{ id: 35, name: "Monaco", parentId: 1 },
	{ id: 36, name: "Montenegro", parentId: 1 },
	{ id: 37, name: "Netherlands", parentId: 1 },
	{ id: 38, name: "North Macedonia", parentId: 1 },
	{ id: 39, name: "Norway", parentId: 1 },
	{ id: 40, name: "Poland", parentId: 1 },
	{ id: 41, name: "Portugal", parentId: 1 },
	{ id: 42, name: "Romania", parentId: 1 },
	{ id: 43, name: "Russia", parentId: 1 },
	{ id: 44, name: "San Marino", parentId: 1 },
	{ id: 45, name: "Serbia", parentId: 1 },
	{ id: 46, name: "Slovakia", parentId: 1 },
	{ id: 47, name: "Slovenia", parentId: 1 },
	{ id: 48, name: "Spain", parentId: 1 },
	{ id: 49, name: "Sweden", parentId: 1 },
	{ id: 50, name: "Switzerland", parentId: 1 },
	{ id: 51, name: "Thailand", parentId: 2 },
	{ id: 52, name: "Turkey", parentId: 2 },
	{ id: 53, name: "China", parentId: 2 },
	{ id: 54, name: "India", parentId: 2 },
	{ id: 55, name: "Nigeria", parentId: 3 },
	{ id: 56, name: "South Africa", parentId: 3 },
	{ id: 57, name: "United States", parentId: 4 },
	{ id: 58, name: "Canada", parentId: 4 },
	{ id: 59, name: "Brazil", parentId: 5 },
	{ id: 60, name: "Argentina", parentId: 5 },
	{ id: 61, name: "Australia", parentId: 6 },
	{ id: 62, name: "New Zealand", parentId: 6 },
	{ id: 63, name: "Antarctica", parentId: 7 },
] as const;

export type TreeNode = {
	id: number;
	name: string;
	parentId: number | null;
	children: TreeNode[];
};

export function buildTree(
	xs: typeof data,
	parentId: number | null = null,
): TreeNode[] {
	return xs
		.filter((p) => p.parentId === parentId)
		.map((p) => ({ ...p, children: buildTree(xs, p.id) }));
}
