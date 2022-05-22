import React from 'react'
import styled, { css } from 'styled-components/macro'

const StyledHeading = styled.header`
	font-family: var(--font__family);
	color: var(--heading__color);
	font-size: var(--heading__font-size);
	line-height: 1.2;
	margin-bottom: 30px;
	display: block;
	width: 100%;

	h1 {
		font-size: 1.2em;
		line-height: 1.1;
	}
	h2 {
		font-size: 1em;
		line-height: 1.1;
	}
	h3 {
		font-size: 0.9em;
	}
	h4 {
		font-size: 0.8em;
	}
	h5 {
		font-size: 0.7em;
	}
	h6 {
		font-size: 0.6em;
	}
`

function Heading({ children, as = 'h2' }) {
	const Heading = as
	return (
		<StyledHeading>
			<Heading>{children}</Heading>
		</StyledHeading>
	)
}

export default Heading
