import React, { forwardRef } from 'react'
import styled, { css } from 'styled-components/macro'

const StyledDropdownTrigger = styled.button`
	width: 25px;
	height: 20px;
	color: var(--c__grey-500);
	position: relative;
	cursor: pointer;
	transition: all 150ms ease-out;

	${({ $opened }) =>
		!!$opened &&
		css`
			color: var(--c__grey-700);
		`}

	${({ $isFeat }) =>
		!!$isFeat &&
		css`
			color: var(--c__green);
		`}
    
	${({ $opened, $isFeat }) =>
		!!$isFeat &&
		!!$opened &&
		css`
			color: var(--c__green-600);
		`}

	&:hover {
		opacity: 0.7;
	}

	svg {
		width: 100%;
		height: 100%;
		fill: currentColor;
	}
`

const DropdownTrigger = (
	{ opened = false, icon = null, isFeat = false, ...restProps },
	ref
) => {
	return (
		<StyledDropdownTrigger
			ref={ref}
			$opened={opened}
			$isFeat={isFeat}
			{...restProps}
		>
			{icon}
		</StyledDropdownTrigger>
	)
}

export default forwardRef(DropdownTrigger)
