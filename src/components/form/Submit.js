import React from 'react'
import cx from 'classnames'

function Submit({ label = '', primary = true }) {
	return (
		<button
			type="submit"
			className={cx({
				form__submit: true,
				button: true,
				[`button--primary`]: primary
			})}
		>
			{label}
		</button>
	)
}

export default Submit
