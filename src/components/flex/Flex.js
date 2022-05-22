import React from 'react'
import styled, { css } from 'styled-components/macro'

const StyledFlex = styled.div`
	display: flex;
	flex-flow: ${({ flexFlow }) => flexFlow};
	align-items: ${({ alignItems }) => alignItems};
	justify-content: ${({ justifyContent }) => justifyContent};

	${({ childrenGutter }) =>
		childrenGutter &&
		css`
			& > * {
				margin-right: ${childrenGutter};
				margin-bottom: ${childrenGutter};

				&:last-child {
					margin-right: 0;
				}
			}
		`}
`

function Flex({
	children,
	flexFlow = 'row wrap',
	alignItems = 'center',
	justifyContent = 'flex-start',
	childrenGutter = '0px',
	...restProps
}) {
	return (
		<StyledFlex
			flexFlow={flexFlow}
			alignItems={alignItems}
			justifyContent={justifyContent}
			childrenGutter={childrenGutter}
			{...restProps}
		>
			{children}
		</StyledFlex>
	)
}

export default Flex
