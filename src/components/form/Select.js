import React, { useEffect } from 'react'
import ReactSelect from 'react-select'
import styled, { css } from 'styled-components/macro'
import { useFormContext, useController } from 'react-hook-form'
import { isEmpty } from 'lodash'

import Label from './Label'
import ErrorMessage from './ErrorMessage'

const StyledSelect = styled(ReactSelect)`
	width: 100%;
	min-width: ${({ $width }) => ($width ? `${$width}px` : 0)};
	font-size: 16px;
	background-color: var(--c__white);

	.select__control {
		font-size: 1em;
		color: var(--c__grey-500);
		border: 1px solid var(--c__white);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
		border-radius: var(--border__radius--small);
		min-height: var(--textfield__height);

		&:hover {
			box-shadow: 0 3px 6px rgba(0, 0, 0, 0.24);
		}

		&--menu-is-open {
			.select__indicator {
				transform: rotate(180deg);
			}
		}

		${({ $inverted }) =>
			!!$inverted &&
			css`
				border-color: var(--c__grey-200);
				background-color: var(--c__grey-200);
				box-shadow: none;

				&:hover {
					border-color: var(--c__grey-200);
					box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
				}
			`}

		${({ $error }) =>
			!!$error &&
			css`
				color: var(--c__white);
				border-color: var(--c__error);
				background-color: var(--c__error);
				box-shadow: none;

				&:hover {
					border-color: var(--c__error);
					box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
				}
			`}
	}
	.select__multi-value {
		padding: 5px;

		${({ $inverted }) =>
			!!$inverted &&
			css`
				background-color: var(--c__white);
			`}
	}
	.select__placeholder {
		${({ $error }) =>
			!!$error &&
			css`
				color: var(--c__white);
			`}
	}
	.select__indicator-separator {
		display: none;
	}
	.select__indicator {
		color: var(--c__grey-700);
		transition: transform 150ms ease-out;

		${({ $error }) =>
			!!$error &&
			css`
				color: var(--c__white);
			`}
	}
	.select__menu {
		border: none;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
		z-index: 99;
	}
	.select__option {
		background-color: var(--c__white);
		font-size: 1em;
		color: var(--c__grey-500);

		&:hover {
			background-color: var(--c__grey-150);
		}

		&--is-selected {
			background-color: var(--c__grey-150);
			color: var(--c__grey-700);
			font-weight: 700;
		}
	}
`

function Select({
	options = [],
	name = '',
	defaultValue = null,
	value = null,
	className = 'select',
	classNamePrefix = 'select',
	label = null,
	rules = null,
	width = 0,
	showError = true,
	errorMessage = 'Este campo es obligatorio',
	placeholder = 'Selecciona una opción',
	inverted = false,
	isMulti = false,
	onChange = () => {},
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
		defaultValue: isMulti ? defaultValue || [] : defaultValue?.value
	})
	const { ref, ...fieldRest } = field

	const error = !!errors[name]
	const customErrorMessage = !!errors ? errors[name]?.message : null

	/*useEffect(() => {
		if (restProps?.isMulti && !isEmpty(defaultValue)) {
			setValue(
				name,
				defaultValue?.map(e => e.value)
			)
		} else if (!isEmpty(defaultValue)) {
			setValue(name, defaultValue.value)
		}
	}, [defaultValue])*/

	useEffect(() => {
		if (!isEmpty(value)) {
			setValue(name, value.value)
		}
	}, [value])

	return (
		<>
			{label && <Label htmlFor={name} title={label} />}
			<StyledSelect
				{...fieldRest}
				inputRef={ref}
				onChange={data => {
					console.log(data)
					if (isMulti) {
						if (!!data) {
							fieldRest.onChange(
								Array.from(data).map(e => parseInt(e['value']))
							)
						} else {
							fieldRest.onChange([])
						}
					} else {
						fieldRest.onChange(data.value)
					}

					onChange(data)
				}}
				value={options.find(c => c.value === fieldRest.value)}
				className={className}
				classNamePrefix={classNamePrefix}
				options={options}
				$width={width}
				$error={error}
				$inverted={inverted}
				defaultValue={defaultValue?.value || value}
				placeholder={placeholder}
				isMulti={isMulti}
				{...restProps}
			/>
			{showError && error && (
				<ErrorMessage message={customErrorMessage || errorMessage} />
			)}
		</>
	)
}

export default Select
