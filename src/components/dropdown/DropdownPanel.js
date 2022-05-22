import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { Arrow } from 'react-laag'
import { motion } from 'framer-motion'

const StyledDropdownPanel = styled(motion.aside)`
	transition: color 0.15s, background-color 0.15s;
	position: absolute;
	z-index: 9999;
	min-width: ${({ $width }) => `${$width}px`};
	min-height: 150px;
	list-style: none;
	background-clip: padding-box;
	margin: 0;
	border: 1px solid var(--c__grey);

	border-radius: var(--border__radius--small);
	background-color: var(--c__white);
	box-shadow: var(--dashboard__shadow);
	padding: var(--dropdown__panel-padding) 0;

	& > p {
		color: var(--c__green-500);
		padding: var(--dropdown__panel-padding);

		& > a {
			display: inline-block;
			font-weight: 900;
			transition: opacity 150ms ease-out;

			&:hover {
				opacity: 0.6;
			}

			&.active {
				color: var(--c__green);
			}
		}
	}

	& > a,
	& > button {
		font-size: 14px;
		line-height: 1.2;
		font-weight: 600 !important;
		background-color: var(--c__white);
		color: var(--c__grey-500);
		text-align: left;
		padding: var(--dropdown__panel-padding);
		display: flex;
		align-items: flex-start;
		width: 100%;
		transition: background 150ms ease-out, color 150ms ease-out;

		&:hover {
			background-color: var(--c__grey-150);
			color: var(--c__grey-700);

			svg {
				fill: var(--c__green);
			}
		}

		&:active {
			opacity: 0.7;
		}

		&.active {
			background-color: var(--c__grey-150);
			color: var(--c__grey-700);
		}

		span {
			font-size: 1em;
			line-height: inherit;
			display: inline-block;
			flex: 1;
		}

		svg {
			width: 1.2em;
			height: 1.2em;
			fill: currentColor;
			margin-right: 0.8em;
			margin-top: -0.1em;
			transition: fill 150ms ease-out;
		}
	}

	& > a {
		text-decoration: none !important;
	}
`
const DropdownPanel = ({ children, arrowProps, width, ...rest }, ref) => {
	return (
		<StyledDropdownPanel
			ref={ref}
			initial={{ opacity: 0, scale: 0.85 }} // animate from
			animate={{ opacity: 1, scale: 1 }} // animate to
			exit={{ opacity: 0, scale: 0.85 }} // animate exit
			transition={{
				type: 'spring',
				stiffness: 800,
				damping: 35
			}}
			$width={width}
			{...rest}
		>
			{children}

			{arrowProps && (
				<Arrow
					{...arrowProps}
					borderColor="var(--c__grey)"
					borderWidth={1}
					roundness={0.5}
					size={10}
				/>
			)}
		</StyledDropdownPanel>
	)
}

export default forwardRef(DropdownPanel)
