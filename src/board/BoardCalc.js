import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components/macro'
import { useFormContext, useWatch } from 'react-hook-form'

import yup from '@yup'

import useNotes from '@hooks/notes'
import { MAX_PERCENT } from '@constants'

import { Form, TextField, Label } from '@components/form'
import { Button } from '@components/button'
import { ReactComponent as PlusIcon } from '@svgs/plus.svg'

const schema = yup.object().shape({
	value: yup
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
		.max(10, 'No puede ser mayor que 10')
		.required(),
	percent: yup
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
		.max(MAX_PERCENT, `No puede ser mayor que ${MAX_PERCENT}`)
		.required()
})

const StyledBoardCalc = styled.div``
const StyledBoardCalcInner = styled.div`
	display: flex;
	flex-flow: column;
	align-items: flex-start;
	gap: 40px;
	padding-bottom: 40px;
`
const StyledBoardCalcItem = styled.section`
	width: 100%;
`
const StyledBoardCalcItemGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 50% 1fr;
	gap: 20px;
	align-items: center;
`
const StyledBoardCalcItemGridGroup = styled.div`
	display: flex;
	flex-flow: column;
	align-items: flex-start;
	gap: 20px;
`
const StyledBoardCalcItemResult = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 50px;
	font-weight: 900;
	color: var(--c__grey-700);
`
const StyledBoardCalcItemPercent = styled.div`
	position: relative;

	input {
		padding-right: 40px;
	}

	span.percent {
		position: absolute;
		top: 13px;
		right: 13px;
		z-index: 2;
	}
`
const StyledBoardCalcHeader = styled.header`
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: var(--c__grey-200);
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: var(--gutter);
	border-bottom: 1px solid var(--c__grey-300);

	button {
		svg {
			position: relative;
			top: -1px;
		}
	}
`
const StyledBoardCalcForm = styled(Form)`
	width: 100%;
	padding: 0 var(--gutter);
`

const BoardCalcItem = ({ id, value, percent }) => {
	const { control } = useFormContext()

	const valueField = useWatch({
		control,
		name: 'value'
	})
	const percentField = useWatch({
		control,
		name: 'percent'
	})

	const { getNoteByPercent, updateNote } = useNotes()
	const noteByPercent = getNoteByPercent(id)

	useEffect(() => {
		updateNote(id, { value: valueField })
	}, [valueField])

	useEffect(() => {
		updateNote(id, { percent: percentField })
	}, [percentField])

	return (
		<StyledBoardCalcItem>
			<Label title="Nueva nota" />
			<StyledBoardCalcItemGrid>
				<StyledBoardCalcItemGridGroup>
					<TextField name="value" placeholder="Nota" value={value} />
					<StyledBoardCalcItemPercent>
						<TextField
							name="percent"
							placeholder="Porcentaje"
							value={percent}
						/>
						<span className="percent">%</span>
					</StyledBoardCalcItemPercent>
				</StyledBoardCalcItemGridGroup>
				<StyledBoardCalcItemResult>
					<p>{noteByPercent}</p>
				</StyledBoardCalcItemResult>
			</StyledBoardCalcItemGrid>
		</StyledBoardCalcItem>
	)
}
const BoardCalc = () => {
	const { createNote, resetNotes, getNotes, canAddNotes } = useNotes()
	const notes = getNotes()
	const canAddNotesVar = canAddNotes()

	const handleClickCreate = useCallback(() => {
		createNote()
	}, [createNote])

	const handleClickReset = useCallback(() => {
		resetNotes()
	}, [resetNotes])

	useEffect(() => {
		if (!notes.length) {
			createNote()
		}
	}, [notes])

	return (
		<StyledBoardCalc>
			<StyledBoardCalcInner>
				<StyledBoardCalcHeader>
					<Button
						label="Añadir nota"
						theme="primary"
						size="normal"
						icon={<PlusIcon />}
						disabled={!canAddNotesVar}
						onClick={handleClickCreate}
					/>
					<Button
						label="Borrar notas"
						theme="danger"
						onClick={handleClickReset}
					/>
				</StyledBoardCalcHeader>
				{!notes.length
					? null
					: notes.map(note => (
							<StyledBoardCalcForm
								key={note.id}
								schema={schema}
								useFormProps={{
									mode: 'onChange'
								}}
							>
								<BoardCalcItem {...note} />
							</StyledBoardCalcForm>
					  ))}
			</StyledBoardCalcInner>
		</StyledBoardCalc>
	)
}

export default BoardCalc
