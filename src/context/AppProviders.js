import React from 'react'

import GlobalStyles from '@styles/index.js'

const AppProviders = ({ children }) => {
	return (
		<>
			<GlobalStyles />
			{children}
		</>
	)
}

export default AppProviders
