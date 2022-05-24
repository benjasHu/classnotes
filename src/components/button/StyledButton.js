import React from 'react'
import styled, { css } from 'styled-components/macro'

const StyledButton = styled.button`
	display: flex;
	align-items: center;
	padding: 1em 1.2em;
	font-size: 16px;
	border-radius: var(--button__border-radius);
	transition: all 150ms ease-out;

	span,
	svg {
		transition: all 150ms ease-out;
	}

	${({ disabled }) =>
		!!disabled &&
		css`
			opacity: 0.4;
			pointer-events: none;
		`}

	${({ $full }) =>
		!!$full &&
		css`
			width: 100%;
		`}

	${({ $center }) =>
		!!$center &&
		css`
			justify-content: center;
		`}

	${({ $size }) =>
		$size === 'small' &&
		css`
			font-size: 14px;
			padding: 0.6em 0.7em;
			border-radius: var(--border__radius--small);
		`}

	${({ $size }) =>
		$size === 'normal' &&
		css`
			font-size: 14px;
			padding: 0.7em 0.9em;
			border-radius: var(--border__radius--small);
		`}

		${({ $theme }) =>
		$theme === 'basic' &&
		css`
			padding: 0.5em 0;
			border-radius: 0;
			color: var(--c__green-400);
			padding-left: 0;
			padding-right: 0;

			&:hover {
				text-decoration: underline;
				color: var(--c__green);
			}
			&:active {
				span {
					opacity: 0.7;
				}
			}
		`}

	${({ $theme }) =>
		$theme === 'primary' &&
		css`
			background-color: var(--c__default);
			color: var(--c__white);

			&:hover {
				background-color: var(--c__default--hover);
			}
			&:active {
				span {
					opacity: 0.7;
				}
			}
		`}

	${({ $theme }) =>
		$theme === 'secondary' &&
		css`
			border: 2px solid var(--c__green);
			background-color: var(--c__white);
			color: var(--c__grey-500);

			&:hover {
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
			}
			&:active {
				span,
				svg {
					opacity: 0.7 !important;
				}
			}
		`}

	${({ $theme }) =>
		$theme === 'danger' &&
		css`
			background-color: var(--c__error);
			color: var(--c__white);

			&:hover {
				box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
			}
			&:active {
				span,
				svg {
					opacity: 0.7 !important;
				}
			}
		`}

	svg {
		width: 1em;
		height: 1em;
		fill: currentColor;

		${({ $iconPosition, $label }) =>
			!!$label &&
			$iconPosition === 'left' &&
			css`
				margin-right: 0.4em;
			`}

		${({ $iconPosition, $label }) =>
			!!$label &&
			$iconPosition === 'right' &&
			css`
				margin-left: 0.4em;
			`}
	}
`

const StyledButtonLabel = styled.span`
	font-size: inherit;
	line-height: 1;
`

export { StyledButton, StyledButtonLabel }
