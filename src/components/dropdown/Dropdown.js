import React, { forwardRef, useState, cloneElement, useEffect } from 'react'
import styled from 'styled-components/macro'
import { useLayer, useHover } from 'react-laag'
import { AnimatePresence } from 'framer-motion'

import DropdownPanel from './DropdownPanel'

const StyledDropdownContainer = styled.div`
	position: relative;
`
const StyledDropdownTrigger = styled.div`
	position: relative;
`

const Dropdown = (
	{
		children,
		trigger = null,
		timeout = 2000,
		closeOnClick = false,
		width = 200,
		onChange = () => {},
		layerProps = {},
		hoverProps = {}
	},
	ref
) => {
	const [opened, setOpened] = useState(false)

	const close = () => setOpened(false)

	const [isOver, hoverPropsHook, closeOver] = useHover({
		delayEnter: 300,
		delayLeave: timeout,
		hideOnScroll: false,
		...hoverProps
	})

	const {
		renderLayer,
		triggerProps,
		layerProps: layerPropsHook,
		arrowProps
	} = useLayer({
		isOpen: opened,
		onOutsideClick: close,
		onDisappear: close,
		onParentClose: () => !!timeout && closeOver(),
		overflowContainer: false,
		auto: true,
		placement: 'bottom-end',
		triggerOffset: 12,
		containerOffset: 16,
		arrowOffset: 16,
		...layerProps
	})

	const renderedTrigger = !trigger
		? null
		: cloneElement(trigger({ opened }), {
				onClick: () => setOpened(!opened)
		  })

	useEffect(() => {
		onChange(opened)
	}, [opened])

	useEffect(() => {
		if (!isOver && !!timeout) {
			close()
		}
	}, [isOver])

	return (
		<StyledDropdownContainer ref={ref} {...(!!timeout ? hoverPropsHook : {})}>
			<StyledDropdownTrigger ref={triggerProps.ref}>
				{renderedTrigger}
			</StyledDropdownTrigger>
			{renderLayer(
				<AnimatePresence>
					{opened && (
						<DropdownPanel
							ref={ref}
							{...layerPropsHook}
							width={width}
							arrowProps={arrowProps}
							onClick={e => closeOnClick && close()}
						>
							{children}
						</DropdownPanel>
					)}
				</AnimatePresence>
			)}
		</StyledDropdownContainer>
	)
}

export default forwardRef(Dropdown)
