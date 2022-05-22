import * as React from 'react'
import styled from 'styled-components/macro'
import { useLayer, mergeRefs, Arrow } from 'react-laag'
import { Button } from '@components/button'
import { AnimatePresence, motion } from 'framer-motion'

const StyledPopoverPanel = styled(motion.aside)`
	transition: color 0.15s, background-color 0.15s;
	position: absolute;
	min-width: 160px;
	min-height: 200px;
	padding: 4px 0px;
	list-style: none;
	background-clip: padding-box;
	border-radius: 4px;
	box-shadow: 0 1px 15px rgba(27, 31, 35, 0.15);
	margin: 0;
	background-color: white;
	color: #333;
	border: 1px solid rgba(27, 31, 35, 0.15);
`
const PopoverPanel = React.forwardRef(function PopoverPanel(
	{ children, arrowProps, ...rest },
	ref
) {
	return (
		<StyledPopoverPanel
			ref={ref}
			initial={{ opacity: 0, scale: 0.85 }} // animate from
			animate={{ opacity: 1, scale: 1 }} // animate to
			exit={{ opacity: 0, scale: 0.85 }} // animate exit
			transition={{
				type: 'spring',
				stiffness: 800,
				damping: 35
			}}
			{...rest}
		>
			{children}

			{arrowProps && (
				<Arrow
					{...arrowProps}
					borderColor="rgba(27, 31, 35, 0.15)"
					borderWidth={1}
					roundness={0.5}
				/>
			)}
		</StyledPopoverPanel>
	)
})

const Popover = React.forwardRef(function Popover(props, ref) {
	const [isOpen, setOpen] = React.useState(false)

	function close() {
		setOpen(false)
	}

	const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
		isOpen,
		onOutsideClick: close,
		onDisappear: close,
		overflowContainer: false,
		auto: true,
		placement: 'bottom-end',
		triggerOffset: 12,
		containerOffset: 16,
		arrowOffset: 16
	})

	return (
		<>
			{renderLayer(
				<AnimatePresence>
					{isOpen && (
						<PopoverPanel {...layerProps} arrowProps={arrowProps}>
							<p>Hola</p>
						</PopoverPanel>
					)}
				</AnimatePresence>
			)}
			<Button
				{...props}
				ref={mergeRefs(triggerProps.ref, ref)}
				onClick={() => setOpen(!isOpen)}
				label={isOpen ? 'Hide' : 'Show'}
				theme="secondary"
			/>
		</>
	)
})

export default Popover
