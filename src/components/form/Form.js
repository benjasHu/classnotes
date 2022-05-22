import React from 'react'
import styled, { css } from 'styled-components/macro'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import pipe from 'ramda/es/pipe'

const StyledForm = styled.form`
	width: 100%;
	position: relative;
`

function Form({
	children,
	loading = false,
	schema = null,
	useFormProps = {},
	onSubmit = () => {},
	onError = () => {},
	...restProps
}) {
	const { onFilterState, ...restPropsFiltered } = restProps
	const methods = useForm({
		resolver: yupResolver(schema),
		...useFormProps
	})
	const { handleSubmit, ...restMethods } = methods

	const handleOnFilterState = form => {
		return !!onFilterState ? restProps.onFilterState(form) : form
	}

	return (
		<FormProvider {...methods}>
			<StyledForm
				$loading={loading}
				onSubmit={handleSubmit(pipe(handleOnFilterState, onSubmit), onError)}
				{...restMethods}
				{...restPropsFiltered}
			>
				{children}
			</StyledForm>
		</FormProvider>
	)
}

export default Form
