export const MAX_PERCENT_STORAGE_KEY = 'class-notes-max-percent'
export const MAX_PERCENT_DEFAULT = '100'
export const MAX_PERCENT =
	window.localStorage.getItem(MAX_PERCENT_STORAGE_KEY) || MAX_PERCENT_DEFAULT
