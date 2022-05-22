import React from 'react'
import styled, { css } from 'styled-components/macro'

const StyledBadge = styled.i`
	font-size: 0.8em;
	font-weight: 700;
	line-height: 1;
	background-color: var(--c__green);
	color: var(--c__white);
	padding: 5px 7px;
	display: inline-block;
	border-radius: 3px;
	margin-right: 5px;
	transition: all 150ms ease-out;

	${({ $theme }) =>
		$theme === 'light' &&
		css`
			background-color: var(--c__white);
			color: var(--c__grey-700);
		`}
`

function Badge({ count = null, theme = 'default' }) {
	if (!count) return null

	return (
		<StyledBadge className="badge" $theme={theme}>
			{count}
		</StyledBadge>
	)
}

export default Badge
