import React from 'react'
import styled, { css } from 'styled-components/macro'
import { cssVar } from 'polished'

const StyledGridItem = styled.div`
	grid-column: ${({ columnStart, columnEnd }) =>
		`${columnStart} / ${columnEnd}`};

	${({ fullwidthInMobile }) =>
		fullwidthInMobile &&
		css`
			@media (max-width: ${cssVar('--mq__sm')}) {
				grid-column: 1 / -1;
			}
		`}
`

function GridItem({
	children,
	columnStart = 'auto',
	columnEnd = 'auto',
	fullwidthInMobile = true
}) {
	return (
		<StyledGridItem
			columnStart={columnStart}
			columnEnd={columnEnd}
			fullwidthInMobile={fullwidthInMobile}
		>
			{children}
		</StyledGridItem>
	)
}

export default GridItem
