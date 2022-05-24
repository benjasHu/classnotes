import React, { useEffect, useMemo, useCallback } from 'react'
import styled, { css } from 'styled-components/macro'
import { useFormContext, useWatch } from 'react-hook-form'
import { useLocalStorage, useCopyToClipboard } from 'react-use'

import yup from '@yup'
import useNotes from '@hooks/notes'
import { MAX_PERCENT_STORAGE_KEY, MAX_PERCENT } from '@constants'

import { Form, TextField } from '@components/form'
import { Button } from '@components/button'

const StyledBoardResult = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;
	gap: 40px;
	width: 100%;
	color: var(--c__grey-700);
	position: sticky;
	top: 0;
	padding: var(--gutter);
`
const StyledBoardResultTotal = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;

	strong {
		font-size: 80px;
		font-weight: 900;
	}

	& > span {
		font-size: 16px;
		font-weight: 400;
		margin-bottom: 10px;
	}
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
		transition: all 150ms ease-out;
	}
`
const StyledBoardResultListItemValue = styled.strong`
	color: var(--c__success);

	${({ $exceeded }) =>
		!!$exceeded &&
		css`
			color: var(--c__error);
			font-size: 3em !important;
		`}
`
const StyledBoardResultMaxPercent = styled.div`
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
	const [maxPercentStorage, setMaxPercentStorage] = useLocalStorage(
		MAX_PERCENT_STORAGE_KEY,
		MAX_PERCENT
	)
	const { updateMaxPercent } = useNotes()
	const { control } = useFormContext()

	const maxPercentField = useWatch({
		control,
		name: 'maxPercent',
		defaultValue: maxPercentStorage
	})

	useEffect(() => {
		updateMaxPercent(maxPercentField)
		setMaxPercentStorage(maxPercentField)
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
	const [clipboardState, copyToClipboard] = useCopyToClipboard()
	const { getTotalNote, getMaxPercent, getTotalPercents } = useNotes()
	const totalNote = getTotalNote()
	const maxPercent = getMaxPercent()
	const totalPercents = getTotalPercents()

	const exceededPercent = useMemo(
		() => totalPercents > parseFloat(maxPercent),
		[maxPercent, totalPercents]
	)

	const handleClickCopyTotalNote = useCallback(() => {
		copyToClipboard(totalNote)
	}, [totalNote, copyToClipboard])

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
			<StyledBoardResultTotal>
				<strong>{totalNote}</strong>
				<span>Total notas</span>
				<Button
					label="Copiar"
					theme="primary"
					onClick={handleClickCopyTotalNote}
				/>
			</StyledBoardResultTotal>
			<StyledBoardResultList>
				<StyledBoardResultListItem>
					<span>Porcentaje máximo:</span>
					<strong>{maxPercent}%</strong>
				</StyledBoardResultListItem>
				<StyledBoardResultListItem>
					<span>Porcentaje total añadido:</span>
					<StyledBoardResultListItemValue $exceeded={exceededPercent}>
						{totalPercents}%
					</StyledBoardResultListItemValue>
				</StyledBoardResultListItem>
			</StyledBoardResultList>
		</StyledBoardResult>
	)
}

export default BoardResult
