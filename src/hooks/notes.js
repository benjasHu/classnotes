import { useCallback } from 'react'
import { nanoid } from 'nanoid'
import { isNaN } from 'lodash'

import useStore from '@store/store'

export default function useNotes() {
	const notes = useStore(({ notes }) => notes)
	const set = useStore(({ set }) => set)

	const getMaxPercent = useCallback(() => notes.maxPercent, [notes.maxPercent])
	const getNotes = useCallback(() => notes.collection, [notes.collection])

	const createNote = useCallback(() => {
		set(({ notes }) => {
			const newNote = {
				id: nanoid(),
				value: '',
				percent: ''
			}

			notes.collection.push(newNote)
		})
	}, [set])

	const updateNote = useCallback(
		(id, data) => {
			set(({ notes }) => {
				const note = notes.collection.find(note => note.id === id)

				if (!!note) {
					Object.entries(data).forEach(([key, value]) => {
						note[key] = value
					})
				}
			})
		},
		[set]
	)

	const updateMaxPercent = useCallback(
		percent => {
			set(({ notes }) => {
				notes.maxPercent = isNaN(percent) ? notes.maxPercent : percent
			})
		},
		[set]
	)

	const resetNotes = useCallback(() => {
		set(({ notes }) => {
			notes.collection = [
				{
					id: nanoid(),
					value: '',
					percent: ''
				}
			]
		})
	}, [set])

	const getNoteByPercent = useCallback(
		id => {
			const note = notes.collection.find(note => note.id === id)

			if (!!note) {
				const noteValue = parseFloat(note.value)
				const notePercent = parseFloat(note.percent)
				const maxPercent = getMaxPercent()

				if (!notePercent || !noteValue) return 0

				const result = (noteValue * notePercent) / maxPercent
				return parseFloat(result.toFixed(2))
			}
		},
		[notes.collection, getMaxPercent]
	)

	const getTotalNote = useCallback(() => {
		const values = notes.collection.map(({ id }) => getNoteByPercent(id))

		if (values.some(val => isNaN(val))) return 0

		const result = values.reduce((acc, value) => acc + value, 0)
		return parseFloat(result.toFixed(2))
	}, [notes.collection, getNoteByPercent])

	const getTotalPercents = useCallback(() => {
		const percents = notes.collection.map(({ percent }) => parseFloat(percent))
		const parsedPercents = percents.filter(val => !isNaN(val))

		const result = parsedPercents.reduce((acc, value) => acc + value, 0)
		return parseFloat(result.toFixed(2))
	}, [notes.collection])

	const canAddNotes = useCallback(() => {
		const percents = getTotalPercents()
		const maxPercent = getMaxPercent()

		console.log('percents', percents)
		console.log('maxPercent', parseFloat(maxPercent))

		return percents < parseFloat(maxPercent)
	}, [getMaxPercent, getTotalPercents])

	return {
		getNotes,
		createNote,
		resetNotes,
		updateNote,
		updateMaxPercent,
		getMaxPercent,
		getNoteByPercent,
		getTotalNote,
		getTotalPercents,
		canAddNotes
	}
}
