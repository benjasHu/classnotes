import { useCallback } from 'react'

function useUtils() {
	const toSelect = useCallback(
		(collection, keys = { value: 'id', label: 'title' }) => {
			return collection.map(item => {
				return {
					value: item[keys.value || 'id'],
					label: item[keys.label || 'title']
				}
			})
		},
		[]
	)

	const toSelectCategory = useCallback(collection => {
		return collection.map(({ id, category }) => ({
			value: id,
			label: category
		}))
	}, [])

	const getSelectValue = useCallback((options, defaultValue, multi = false) => {
		let isArray = Array.isArray(defaultValue) //multiselect
		let opt1
		if (isArray) {
			opt1 = defaultValue.map(value =>
				options.find(
					({ value: optionValue }) =>
						optionValue === value ||
						optionValue?.toString() === value?.toString()
				)
			)
		}

		let opt2 = options.find(
			({ value }) =>
				value === (defaultValue?.id || defaultValue?.value || defaultValue)
		)

		return isArray ? opt1 : opt2 ? opt2 : multi ? [options[0]] : options[0]
	}, [])

	const collectionToSelect = useCallback(
		(collection, key = 'active') => {
			const select = toSelect(collection)
			const itemActive = collection.find(item => !!item[key])
			const selectActive = getSelectValue(select, itemActive)

			return { select, selectActive }
		},
		[toSelect, getSelectValue]
	)

	const exclude = useCallback((data, excludes) => {
		let out = {}
		Object.keys(data).forEach(key => {
			if (!excludes.includes(key)) {
				out[key] = data[key]
			}
		})

		return out
	}, [])

	const parseCurrency = useCallback(value => {
		const number = Number(value)
		return number.toLocaleString('es-ES', {
			style: 'currency',
			currency: 'EUR',
			maximumSignificantDigits: value < 1 ? 4 : number.toString().length + 2
		})
	}, [])

	const joinWithCommas = useCallback((collection, key = 'title') => {
		if (collection.length === 0) return '-'
		if (collection.length === 1) return collection[0][key]
		return collection.reduce((result, item, index) => {
			return (result += `${item[key]}${
				index === collection.length - 1 ? '' : ', '
			}`)
		}, '')
	}, [])

	return {
		toSelect,
		toSelectCategory,
		getSelectValue,
		collectionToSelect,
		exclude,
		parseCurrency,
		joinWithCommas
	}
}

export { useUtils }
