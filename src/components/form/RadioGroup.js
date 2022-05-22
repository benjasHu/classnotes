import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { useFormContext } from 'react-hook-form'

import Radio from './Radio'
import ErrorMessage from './ErrorMessage'

const StyledRadioGroup = styled.div`
	width: 100%;

	& > div {
		width: 100%;
		margin-bottom: 15px;

		&:last-child {
			margin-bottom: 0;
		}
	}
`

function RadioGroup({
	items = [],
	name = '',
	rules = null,
	showError = true,
	errorMessage = 'Estos campos son obligatorios'
}) {
	const [checkeds, setCheckeds] = useState(
		items.map(item => ({ ...item, checked: item.checked }))
	)
	const { errors } = useFormContext()

	const error = !!rules ? !!errors[name] : false
	const customErrorMessage = !!errors ? errors[name]?.message : null

	const handleChangeRadio = ({ value, checked }) => {
		setCheckeds(
			checkeds.map(item => {
				return {
					...item,
					checked: item.value === value && checked
				}
			})
		)
	}

	if (!items.length) {
		return null
	}

	return (
		<StyledRadioGroup>
			{items.map((item, i) => (
				<Radio
					key={item.value}
					uncontrolled={false}
					name={name}
					checked={checkeds[i]?.checked}
					rules={rules}
					id={`${name}-${item.value}`}
					value={item?.value}
					label={item?.label}
					onChange={handleChangeRadio}
				/>
			))}
			{showError && error && (
				<ErrorMessage
					message={
						customErrorMessage !== '' ? customErrorMessage : errorMessage
					}
				/>
			)}
		</StyledRadioGroup>
	)
}

export default RadioGroup
