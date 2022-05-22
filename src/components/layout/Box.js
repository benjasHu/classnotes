import React from 'react'
import styled, { css } from 'styled-components/macro'

const StyledBox = styled.section`
	margin-bottom: var(--layout__box-gutter);

	${({ $size }) =>
		!!$size &&
		$size !== 'normal' &&
		css`
			margin-bottom: ${`var(--layout__box-gutter--${$size}`});
		`}

	${({ $nested }) =>
		!!$nested &&
		css`
			padding-left: 30px;
		`}

	&:last-child {
		margin-bottom: 0;
	}
`

function Box({
	children,
	size = 'normal', // small | normal | medium | large | huge
	nested = false
}) {
	return (
		<StyledBox $size={size} $nested={nested}>
			{children}
		</StyledBox>
	)
}

export default Box
