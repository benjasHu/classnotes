import React from 'react'
import styled from 'styled-components/macro'

const StyledPanel = styled.section`
	margin-bottom: var(--layout__box-gutter--medium);
	width: 100%;
	height: 100%;
	padding: 20px;
	background-color: var(--c__white);
	border-radius: var(--border__radius);
	box-shadow: var(--dashboard__shadow);

	&:last-child {
		margin-bottom: 0;
	}

	& > h3 {
		font-size: 18px;
		font-weight: 700;
		color: var(--c__grey-400);
		line-height: 1.2;
		margin-bottom: 15px;
		padding-bottom: 15px;
		border-bottom: 1px solid var(--c__grey-200);
	}
`

function Panel({
	children,
	title = null,
	size = 'normal' // small | normal | medium | large
}) {
	return (
		<StyledPanel $size={size}>
			{title && <h3>{title}</h3>}
			{children}
		</StyledPanel>
	)
}

export default Panel
