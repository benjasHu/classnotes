import React, { memo } from 'react'
import cx from 'classnames'

function Field({ children, className, name = '' }) {
	return (
		<section className={cx({ 'form-field': true, [className]: !!className })}>
			{children}
		</section>
	)
}

export default memo(Field)
