import styled from 'styled-components/macro'

import Board from '@board/Board'

const StyledApp = styled.main`
	width: 100%;
	height: 100%;
`

const App = () => {
	return (
		<StyledApp>
			<Board />
		</StyledApp>
	)
}

export default App
