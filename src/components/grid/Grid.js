import React from 'react'
import styled, { css } from 'styled-components/macro'
import { cssVar } from 'polished'

const StyledGrid = styled.div`
	display: grid;
	gap: ${({ gap }) => gap};
	grid-template-columns: ${({ cols }) => `repeat(${cols}, minmax(0, 1fr))`};

	${({ dense }) =>
		dense &&
		css`
			grid-auto-flow: dense;
		`}

	& > div {
		@media (max-width: ${cssVar('--mq__lg')}) {
			grid-column: 1 / -1;
		}
	}
`

function Grid({
	children,
	cols = 'var(--grid__cols, 12)',
	gap = 'var(--grid__gap)',
	dense = true
}) {
	return (
		<StyledGrid cols={cols} gap={gap} dense={dense}>
			{children}
		</StyledGrid>
	)
}

export default Grid
