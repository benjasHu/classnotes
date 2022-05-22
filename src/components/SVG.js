import React, { useState, useRef, useEffect, useMemo } from 'react'
import styled from 'styled-components/macro'
import { motion, AnimatePresence } from 'framer-motion'

const StyledSvgPlaceholder = styled(motion.figure)`
	width: ${({ $width }) => `${$width}px`};
	height: ${({ $height }) => `${$height}px`};
`

const SVG = ({ name, ...rest }) => {
	const ImportedSvgRef = useRef(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		const importSvg = async () => {
			try {
				ImportedSvgRef.current = (
					await import(
						`!!@svgr/webpack?-svgo,+titleProp,+ref!@svgs/${name}.svg`
					)
				)?.default
			} catch (err) {
				throw err
			} finally {
				setLoading(false)
			}
		}
		importSvg()
	}, [name])

	if (!loading && ImportedSvgRef.current) {
		const { current: ImportedSvg } = ImportedSvgRef
		return <ImportedSvg {...rest} />
	}

	return null
}

export default SVG
