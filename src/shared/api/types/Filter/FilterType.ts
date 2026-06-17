export const FilterType = {
	OPTION: 'OPTION'
} as const

export type FilterType = (typeof FilterType)[keyof typeof FilterType]
