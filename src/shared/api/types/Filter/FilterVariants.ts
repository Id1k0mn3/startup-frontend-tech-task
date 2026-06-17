import { FilterBase } from './FilterBase'
import { FilterChooseOption } from './FilterChooseOption'
import { FilterType } from './FilterType'

export interface FilterChoose extends FilterBase {
	type: typeof FilterType.OPTION
	options: FilterChooseOption[]
}
