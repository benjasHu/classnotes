import React, { forwardRef } from 'react'
import cx from 'classnames'

function Input(
	{
		name = '',
		type = 'text',
		placeholder = '',
		label = '',
		readOnly = false,
		disabled = false,
		autoFocus = false,
		rules = null,
		error = false,
		hidden = false,
		...restProps
	},
	ref
) {
	return (
		<input
			ref={ref}
			type={type}
			id={name}
			className={cx({
				'is-error': !!error,
				'is-hidden': !!hidden
			})}
			name={name}
			placeholder={placeholder}
			readOnly={readOnly}
			disabled={disabled}
			autoFocus={autoFocus}
			{...restProps}
		/>
	)
}

export default forwardRef(Input)
