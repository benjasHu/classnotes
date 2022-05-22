import React, { useEffect } from 'react'
import styled, { css } from 'styled-components/macro'
import { useFormContext, useController } from 'react-hook-form'

import Label from './Label'
import ErrorMessage from './ErrorMessage'

const StyledTextFieldContainer = styled.div``
const StyledTextField = styled.input`
	width: 100%;
	height: var(--textfield__height);
	line-height: 50px;
	padding: 0 15px;
	font-size: 16px;
	color: var(--c__grey-700);
	border-radius: var(--border__radius--small);
	border: 1px solid var(--c__white);
	background-color: var(--c__white);
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
	outline: none;
	transition: all 150ms ease-out;

	&:focus:not([readonly]) {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
	}

	&[readonly] {
		cursor: default;
	}

	&[type='number'] {
		padding-right: 0;
	}

	${({ $inverted }) =>
		!!$inverted &&
		css`
			border-color: var(--c__grey-200);
			background-color: var(--c__grey-200);
			box-shadow: none;

			&:focus:not([readonly]) {
				box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
			}
		`}

	${({ disabled }) =>
		!!disabled &&
		css`
			opacity: 0.4;
			pointer-events: none;
		`}

	${({ error }) =>
		!!error &&
		css`
			border-color: var(--c__error);
			background-color: var(--c__error);
			color: var(--c__white);

			&::placeholder {
				color: var(--c__white);
			}
		`}

	${({ $size }) =>
		$size === 'small' &&
		css`
			height: var(--textfield__height--small);
			font-size: 14px;
			border-radius: var(--border__radius--small);
		`}
`

function TextField({
	name = '',
	type = 'text',
	placeholder = '',
	value = '',
	label = null,
	rules = {},
	size = 'default', // default | small
	showError = true,
	readOnly = false,
	disabled = false,
	autoFocus = false,
	inverted = false,
	errorMessage = null,
	onChange = () => {},
	onBlur = () => {},
	...restProps
}) {
	const {
		control,
		setValue,
		formState: { errors }
	} = useFormContext()

	const { field } = useController({
		name,
		control,
		rules,
		defaultValue: value
	})

	const error = !!errors[name]
	const customErrorMessage = !!errors ? errors[name]?.message : null

	useEffect(() => {
		!!value && value !== '' && setValue(name, value)
	}, [value, name, setValue])

	return (
		<StyledTextFieldContainer>
			{label && <Label htmlFor={name} title={label} />}
			<StyledTextField
				type={type}
				name={name}
				error={error}
				placeholder={placeholder}
				$size={size}
				$inverted={inverted}
				id={name}
				readOnly={readOnly}
				disabled={disabled}
				autoFocus={autoFocus}
				{...restProps}
				{...field}
				onChange={e => {
					field.onChange(e.target.value)
					onChange(e.target.value, e.target)
				}}
				onBlur={e => {
					field.onBlur(e.target.value)
					onBlur(e.target.value, e.target)
				}}
			/>
			{showError && error && (
				<ErrorMessage message={customErrorMessage || errorMessage} />
			)}
		</StyledTextFieldContainer>
	)
}

export default TextField
