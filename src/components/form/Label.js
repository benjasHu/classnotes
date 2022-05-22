import React from 'react'
import styled, { css } from 'styled-components/macro'

const StyledLabel = styled.label`
	font-size: 16px;
	color: var(--c__grey-700);
	font-weight: 700;
	margin-bottom: 12px;
	display: block;
`

function Label({ children, title, ...restProp }) {
	return (
		<StyledLabel {...restProp}>
			<span>{title}</span>
			{children}
		</StyledLabel>
	)
}

export default Label
