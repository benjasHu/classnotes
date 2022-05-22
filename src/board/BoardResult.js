import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useFormContext, useWatch } from 'react-hook-form'

import yup from '@yup'
import useNotes from '@hooks/notes'

import { Form, TextField } from '@components/form'

const StyledBoardResult = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;
	gap: 40px;
	width: 100%;
	height: 100%;
	color: var(--c__grey-700);
	position: sticky;
	top: 20px;
	padding: var(--gutter);
`
const StyledBoardResultTotal = styled.div`
	font-size: 80px;
	font-weight: 900;
`
const StyledBoardResultList = styled.div`
	display: flex;
	flex-flow: column;
	align-items: flex-start;
	gap: 10px;
`
const StyledBoardResultListItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	font-size: 16px;
	font-weight: 400;
	width: 100%;

	strong {
		font-weight: 900;
		font-size: 1.3em;
	}
`
const StyledBoardResultMaxPercent = styled.div`
	margin-bottom: 30px;
	width: 100%;
`

const schema = yup.object().shape({
	maxPercent: yup
		.number()
		.transform(function (value, originalValue) {
			if (this.isType(value)) return value
			if (!originalValue || !originalValue.trim()) {
				return null
			}
			return originalValue
		})
		.nullable(true)
		.typeError('Debe ser un número')
		.moreThan(-1, 'No puede ser un número negativo')
		.max(100, 'No puede ser mayor que 100')
		.required()
})

const BoardResultMaxPercent = ({ maxPercent }) => {
	const { updateMaxPercent } = useNotes()
	const { control } = useFormContext()

	const maxPercentField = useWatch({
		control,
		name: 'maxPercent',
		defaultValue: maxPercent
	})

	useEffect(() => {
		updateMaxPercent(maxPercentField)
	}, [maxPercentField])

	return (
		<StyledBoardResultMaxPercent>
			<TextField
				label="Porcentaje máximo"
				name="maxPercent"
				placeholder="Escribe el porcentaje máximo"
				value={maxPercentField}
			/>
		</StyledBoardResultMaxPercent>
	)
}
const BoardResult = () => {
	const { getTotalNote, getMaxPercent, getTotalPercents } = useNotes()
	const totalNote = getTotalNote()
	const maxPercent = getMaxPercent()
	const totalPercents = getTotalPercents()

	return (
		<StyledBoardResult>
			<Form
				schema={schema}
				useFormProps={{
					mode: 'onChange'
				}}
			>
				<BoardResultMaxPercent maxPercent={maxPercent} />
			</Form>
			<StyledBoardResultTotal>{totalNote}</StyledBoardResultTotal>
			<StyledBoardResultList>
				<StyledBoardResultListItem>
					<span>Porcentaje máximo:</span>
					<strong>{maxPercent}%</strong>
				</StyledBoardResultListItem>
				<StyledBoardResultListItem>
					<span>Porcentaje total añadido:</span>
					<strong>{totalPercents}%</strong>
				</StyledBoardResultListItem>
			</StyledBoardResultList>
		</StyledBoardResult>
	)
}

export default BoardResult
