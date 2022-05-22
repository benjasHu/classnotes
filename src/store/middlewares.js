import produce from 'immer'

export const log = config => (set, get, api) =>
	config(
		args => {
			set(args)
			console.log('[Store] ', get())
		},
		get,
		api
	)

export const immer = config => (set, get, api) =>
	config(fn => set(produce(fn)), get, api)
