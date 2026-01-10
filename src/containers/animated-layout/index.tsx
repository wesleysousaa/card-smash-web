import { Outlet, useLocation } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'

export default function AnimatedOutlet() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        style={{
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          display: 'flex',
        }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}
