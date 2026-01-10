import { motion } from 'framer-motion'

function TurnIndicator() {
  return (
    <motion.p
      layoutId="turn-indicator"
      key={'turn-indicator'}
      style={{
        width: '100%',
        height: 'calc(100% + 8px)',
        borderRadius: '16px',
        border: 'solid 2px #000',
        position: 'absolute',
        padding: '8px',
        borderStyle: 'dotted',
        zIndex: -1,
      }}
    ></motion.p>
  )
}

export default TurnIndicator
