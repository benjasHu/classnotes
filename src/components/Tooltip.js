import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'
import { useLayer, useHover, Arrow, mergeRefs } from 'react-laag'
import { motion, AnimatePresence } from 'framer-motion'

export const TooltipBox = styled(motion.div)`
	background-color: var(--c__grey-700);
	border: 1px solid var(--c__grey-700);
	color: white;
	font-size: 13px;
	padding: 6px 12px;
	border-radius: 5px;
	transform-origin: center center;
	text-align: center;
	z-index: 100000;
	line-height: 1.4;
	pointer-events: none;
	max-width: 250px;
`

const TooltipText = styled.span``

const positionMap = {
	top: 'top-center',
	bottom: 'bottom-center',
	left: 'left-center',
	right: 'right-center'
}

export const Tooltip = forwardRef(function Tooltip(
	{ children, text, position = 'auto' },
	ref
) {
	const [isOver, hoverProps, close] = useHover({
		delayEnter: 300,
		delayLeave: 300
	})

	const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
		isOpen: isOver,
		placement: positionMap[position],
		possiblePlacements: [
			'top-center',
			'bottom-center',
			'left-center',
			'right-center'
		],
		auto: true,
		snap: true,
		triggerOffset: 12,
		overflowContainer: true,
		onParentClose: close
	})

	let trigger
	if (isReactText(children)) {
		trigger = (
			<TooltipText ref={mergeRefs(ref, triggerProps.ref)} {...hoverProps}>
				{children}
			</TooltipText>
		)
	} else {
		trigger = React.cloneElement(children, {
			ref: mergeRefs(ref, triggerProps.ref),
			...hoverProps
		})
	}

	return (
		<>
			{trigger}
			{renderLayer(
				<AnimatePresence>
					{isOver && (
						<TooltipBox
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9, duration: 30000000 }}
							transition={{ duration: 0.1 }}
							{...layerProps}
						>
							{text}
							<Arrow
								{...arrowProps}
								backgroundColor={'var(--c__grey-700)'}
								borderColor={'var(--c__grey-700)'}
								borderWidth={1}
								size={6}
							/>
						</TooltipBox>
					)}
				</AnimatePresence>
			)}
		</>
	)
})

function isReactText(children) {
	return ['string', 'number'].includes(typeof children)
}

export default Tooltip
