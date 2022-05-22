import React from 'react'
import styled, { css } from 'styled-components/macro'
import { useFormContext } from 'react-hook-form'

import Label from './Label'
import ErrorMessage from './ErrorMessage'

const StyledTextareaContainer = styled.div`
	& > label {
		margin-bottom: 6px;
	}
`
const StyledTextarea = styled.textarea`
	width: 100%;
	min-height: 200px;
	min-width: 100%;
	max-width: 100%;
	padding: 15px;
	font-size: 16px;
	color: var(--c__grey-700);
	border-radius: var(--border__radius--small);
	border: 1px solid var(--c__white);
	background-color: var(--c__white);
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
	outline: none;
	transition: box-shadow 150ms ease-out, border-color 150ms ease-out,
		background-color 150ms ease-out, color 150ms ease-out;

	&:focus {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
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
`

function Textarea({
	name = '',
	placeholder = '',
	defaultValue = '',
	label = null,
	rules = {},
	showError = true,
	disabled = false,
	inverted = false,
	isControlled = false,
	value = null,
	errorMessage = 'Este campo es obligatorio',
	...restProps
}) {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	//const error = !!rules ? !!errors[name] : false
	const error = !!errors[name]
	const customErrorMessage = !!errors ? errors[name]?.message : null

	let valueProps = !!isControlled
		? { value: !!value ? value : '' }
		: { defaultValue }

	return (
		<StyledTextareaContainer>
			{label && <Label htmlFor={name} title={label} />}
			<StyledTextarea
				{...register(name, rules)}
				error={error}
				placeholder={placeholder}
				disabled={disabled}
				$inverted={inverted}
				{...valueProps}
				{...restProps}
			/>
			{showError && error && (
				<ErrorMessage
					message={
						customErrorMessage !== '' ? customErrorMessage : errorMessage
					}
				/>
			)}
		</StyledTextareaContainer>
	)
}

export default Textarea
