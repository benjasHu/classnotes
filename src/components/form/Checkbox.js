import React, { useState, useEffect, useCallback } from 'react'
import styled, { css } from 'styled-components/macro'
import { useFormContext, useController } from 'react-hook-form'
import cx from 'classnames'

import { FaCheck } from 'react-icons/fa'

import ErrorMessage from './ErrorMessage'
import Tooltip from '@components/Tooltip'

const StyledCheckbox = styled.div`
	display: flex;
	flex-flow: column;
	align-items: flex-start;
	justify-content: flex-start;
	margin-bottom: 15px;

	&:last-child {
		margin-bottom: 0;
	}

	& > label {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		color: var(--c__grey-500);
		cursor: pointer;

		${({ $checked }) =>
			!!$checked &&
			css`
				color: var(--c__grey-900);
			`}

		input {
			display: none;
		}

		& > p {
			color: currentColor !important;
		}

		span {
			margin-top: 1px;
			margin-right: 10px;
			width: 20px;
			height: 20px;
			color: currentColor;
			border: 1px solid var(--c__grey-500);
			border-radius: 4px;
			display: flex;
			align-items: center;
			justify-content: center;

			svg {
				width: 70%;
				height: 70%;
				fill: currentColor;
			}
		}
	}
`

function Checkbox({
	name = '',
	label = null,
	checked = false,
	rules = {},
	errorMessage = 'Este campo es obligatorio',
	readOnly = false,
	disabled = false,
	showError = true,
	tooltip = false,
	tooltipProps = {},
	onChange = () => {},
	...restProps
}) {
	const {
		control,
		formState: { errors }
	} = useFormContext()

	const { field } = useController({
		name,
		control,
		rules,
		defaultValue: checked
	})

	const [internalChecked, setInternalChecked] = useState(checked)

	const error = !!errors[name]
	const customErrorMessage = !!errors ? errors[name]?.message : null

	useEffect(() => {
		setInternalChecked(checked)
	}, [checked])

	const renderLabel = () => {
		return (
			<label htmlFor={name}>
				<input
					type="checkbox"
					id={name}
					className={cx({
						'is-error': !!error
					})}
					checked={internalChecked}
					readOnly={readOnly}
					disabled={disabled}
					{...field}
					onChange={e => {
						field.onChange(e.target.checked)
						setInternalChecked(e.target.checked)
						onChange(e.target.checked)
					}}
					{...restProps}
				/>
				<span>{internalChecked ? <FaCheck /> : null}</span>
				{label && <p>{label}</p>}
			</label>
		)
	}

	return (
		<StyledCheckbox $checked={internalChecked}>
			{!!tooltip ? (
				<Tooltip {...tooltipProps}>{renderLabel()}</Tooltip>
			) : (
				renderLabel()
			)}
			{showError && error && (
				<ErrorMessage
					message={
						customErrorMessage !== '' ? customErrorMessage : errorMessage
					}
				/>
			)}
		</StyledCheckbox>
	)
}

export default Checkbox
