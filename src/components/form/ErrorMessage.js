import React from 'react'
import styled from 'styled-components/macro'

const StyledErrorMessage = styled.span`
	font-size: 13px;
	color: var(--c__error);
	display: block;
	margin-top: 10px;
`

function ErrorMessage({ message }) {
	return <StyledErrorMessage>{message}</StyledErrorMessage>
}

export default ErrorMessage
