import React from 'react'
import styled, { css } from 'styled-components/macro'
import { cssVar } from 'polished'

const baseText = () => css`
	font-family: inherit;
	font-weight: inherit;
	font-size: 1em;
	line-height: inherit;
	text-align: inherit;
	margin-bottom: 0.8em;
	color: inherit;
	word-wrap: break-word;

	@media (min-width: ${cssVar('--mq__md')}) {
		margin-bottom: 1em;
	}
`

const StyledText = styled.article`
	font-family: var(--font__family);
	color: var(--text__color);
	font-size: var(--text__font-size);
	line-height: 1.4;
	text-align: left;

	${({ $size }) => {
		if ($size === 'small') {
			return css`
				font-size: calc(var(--text__font-size) - 1px);
			`
		} else if ($size === 'medium') {
			return css`
				font-size: calc(var(--text__font-size) + 2px);
				line-height: 1.6;
			`
		} else if ($size === 'large') {
			return css`
				font-size: calc(var(--text__font-size) + 4px);
				line-height: 1.8;
			`
		}
	}}

	${({ $center }) =>
		!!$center &&
		css`
			text-align: center;
		`}

	p {
		${baseText()}

		a,
		strong,
		b,
		em,
		i,
		span {
			display: inline;
		}
	}

	a {
		${baseText()}
		color: var(--c__green);
		word-break: break-word;
		text-decoration: underline;
		transition: opacity 150ms ease-out;

		&:hover {
			opacity: 0.6;
		}
	}

	strong,
	b,
	em,
	i,
	span {
		font-style: inherit;
		color: inherit;
		font-size: inherit;
		font-weight: inherit;
	}

	sup {
		font-size: 0.8em;
		top: -0.7em;
	}

	strong,
	b {
		font-weight: 800;
		color: inherit;
	}

	em,
	i {
		font-style: italic;
	}

	blockquote {
		${baseText()}
		font-family: var(--font__family);
		font-weight: 500;
		clear: both;
		color: var(--c__black);
		font-size: 1.8em;
		line-height: 1.4;
		padding: 0.5em 1em;
		margin: 0.5em 0;
		position: relative;
		border-left: 5px solid var(--c__grey-400);
	}

	ul {
		li {
			${baseText()}
			display: list-item;
			width: 100%;
			padding-left: 0.3em;
			list-style-type: disc;
		}
	}

	ol {
		li {
			${baseText()}
			counter-increment: step-counter;
			display: list-item;
			width: 100%;
			padding-left: 0.6em;
			list-style-type: decimal;
		}
	}

	ul,
	ol {
		clear: both;
		display: block;
		padding-top: 1em;
		padding-left: 1em;
		margin-bottom: 1.2em;

		li {
			margin-bottom: 1em;

			& > ul,
			& > ol {
				padding-top: 10px;
			}
		}
	}
`

function Text({
	children,
	size = 'normal', // small | normal | medium | large
	center = false
}) {
	return (
		<StyledText $size={size} $center={center}>
			{children}
		</StyledText>
	)
}

export default Text
