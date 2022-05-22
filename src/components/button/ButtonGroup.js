import React from 'react'
import styled from 'styled-components/macro'

const StyledButtonGroup = styled.div`
	display: flex;
	align-items: center;
	flex-flow: row wrap;

	& > a,
	& > button {
		margin-right: 10px;
		position: relative;

		&:last-child {
			margin-right: 0;
		}

		&:after {
			content: '';
			position: absolute;
			top: 0;
			right: -1px;
			z-index: 10;
			width: 1px;
			height: 100%;
			background-color: rgba(255, 255, 255, 0.2);
			pointer-events: none;
		}
	}
`

const ButtonGroup = ({ children }) => {
	return <StyledButtonGroup>{children}</StyledButtonGroup>
}

export default ButtonGroup
