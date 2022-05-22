import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const StyledDropdownPanelItem = styled.div`
	font-size: 14px;
	color: var(--c__grey-700);
	padding: 15px 0;
	display: block;
	border-bottom: 1px solid var(--c__grey-400);
	transition: all 150ms ease-out;
	cursor: pointer;

	&:hover {
		color: var(--c__green);
	}

	&:last-child {
		border-bottom: none;
	}

	& > svg {
		width: 2em;
		height: 2em;
		margin-right: 1em;
	}
`
function DropdownPanelItem(
	{ label, icon = null, to = null, ...restProps },
	ref
) {
	return (
		<StyledDropdownPanelItem ref={ref} {...restProps}>
			{icon && icon}
			{to ? <Link to={to}>{label}</Link> : <span>{label}</span>}
		</StyledDropdownPanelItem>
	)
}

export default forwardRef(DropdownPanelItem)
