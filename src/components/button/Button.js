import React, { forwardRef } from 'react'
import cx from 'classnames'

import { StyledButton, StyledButtonLabel } from './StyledButton'

const Button = (
	{
		label = null,
		title = '',
		icon = null,
		iconPosition = 'left', // left | right
		to = null,
		as = 'button',
		type = 'button',
		theme = 'basic',
		size = 'normal', // small || normal || large
		disabled = false,
		active = false,
		onlyText = false,
		outlined = false,
		rounded = false,
		full = false,
		center = false,
		onClick = () => {},
		...restProps
	},
	ref
) => {
	return (
		<StyledButton
			ref={ref}
			className={cx(['button', `button--${theme}`])}
			$theme={theme}
			$label={label}
			$size={size}
			$iconPosition={iconPosition}
			$rounded={rounded}
			$active={active}
			$onlyText={onlyText}
			$outlined={outlined}
			$full={full}
			$center={center}
			to={to}
			title={label || title}
			type={type}
			disabled={disabled}
			onClick={onClick}
			{...restProps}
		>
			{icon && iconPosition === 'left' && icon}
			{label && <StyledButtonLabel>{label}</StyledButtonLabel>}
			{icon && iconPosition === 'right' && icon}
		</StyledButton>
	)
}

export default forwardRef(Button)
