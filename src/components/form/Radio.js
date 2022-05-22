import React, { useState, useEffect, useCallback } from 'react'
import styled, { css } from 'styled-components/macro'
import { useFormContext } from 'react-hook-form'

import { GoPrimitiveDot } from 'react-icons/go'

const StyledRadio = styled.div`
	display: flex;
	flex-flow: column;
	align-items: flex-start;
	justify-content: flex-start;

	& > label {
		display: flex;
		align-items: center;
		color: var(--c__grey-500);
		cursor: pointer;

		${({ $checked }) =>
			!!$checked &&
			css`
				color: var(--c__grey-700);
			`}

		input {
			display: none;
		}

		& > p {
			color: currentColor !important;
		}

		span {
			margin-right: 10px;
			width: 18px;
			height: 18px;
			color: currentColor;
			border: 1px solid var(--c__grey-500);
			border-radius: 100px;
			display: flex;
			align-items: center;
			justify-content: center;

			svg {
				width: 100%;
				height: 100%;
				fill: currentColor;
			}
		}
	}
`

function Radio({
	name = '',
	uncontrolled = true,
	id = null,
	label = null,
	value = undefined,
	checked = false,
	rules = null,
	errorMessage = 'Este campo es obligatorio',
	readOnly = false,
	disabled = false,
	showError = true,
	onChange = () => {},
	...restProps
}) {
	const [internalChecked, setInternalChecked] = useState(checked)
	const { register } = useFormContext()

	const handleChange = e => {
		if (uncontrolled) {
			setInternalChecked(e.target.checked)
		} else {
			onChange({ value, checked: e.target.checked })
		}
	}

	useEffect(() => {
		if (!uncontrolled) {
			setInternalChecked(checked)
		}
	}, [uncontrolled, checked])

	return (
		<StyledRadio $checked={internalChecked}>
			<label htmlFor={id || name}>
				<input
					ref={register(rules)}
					type="radio"
					id={id || name}
					name={name}
					value={value}
					checked={internalChecked}
					readOnly={readOnly}
					disabled={disabled}
					onChange={handleChange}
					{...restProps}
				/>
				<span>{internalChecked ? <GoPrimitiveDot /> : null}</span>
				{label && <p>{label}</p>}
			</label>
		</StyledRadio>
	)
}

export default Radio
