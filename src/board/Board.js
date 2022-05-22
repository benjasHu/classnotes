import React, { useEffect } from 'react'
import styled from 'styled-components/macro'

import useNotes from '@hooks/notes'

import BoardCalc from './BoardCalc'
import BoardResult from './BoardResult'

const StyledBoard = styled.section`
	width: 100%;
	height: 100%;
	margin-top: 40px;
`
const StyledBoardContainer = styled.div`
	max-width: 1000px;
	padding: 0 20px;
	margin-left: auto;
	margin-right: auto;
`
const StyledBoardGrid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 40px;
`
const StyledBoardGridItem = styled.div`
	background-color: var(--c__grey-200);
	width: 100%;
	height: 100%;
`

const Board = () => {
	const { createNote } = useNotes()

	return (
		<StyledBoard>
			<StyledBoardContainer>
				<StyledBoardGrid>
					<StyledBoardGridItem>
						<BoardCalc />
					</StyledBoardGridItem>
					<StyledBoardGridItem>
						<BoardResult />
					</StyledBoardGridItem>
				</StyledBoardGrid>
			</StyledBoardContainer>
		</StyledBoard>
	)
}

export default Board
