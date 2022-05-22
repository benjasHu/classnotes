import create from 'zustand'
import pipe from 'ramda/es/pipe'

import initialState from './initialState'
import { log, immer } from './middlewares'

const createStore = pipe(log, immer, create)

const useStore = createStore(set => ({
	...initialState,
	set: fn => set(fn)
}))

export default useStore
