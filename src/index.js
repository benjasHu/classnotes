import React from 'react'
import { createRoot } from 'react-dom/client'
import AppProviders from './context/AppProviders'
import App from './App'

const container = document.querySelector('#root')
const root = createRoot(container)

const start = Component => {
	root.render(
		<AppProviders>
			<Component />
		</AppProviders>
	)
}

start(App)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log)
