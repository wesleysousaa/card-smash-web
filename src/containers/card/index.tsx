import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CardContainer, CardTitle } from './styles'
import type { CardInBattle } from '@/types/cads'
import { getCardColor, getCardDisplay } from '@/utils/card'
import { useBattleContext } from '@/context/BattleContext'

export const MotionCardContainer = motion(CardContainer)

function Card({
  card,
  onClick,
  isHighlighted,
  index,
  isArenaCard,
}: {
  card: CardInBattle
  onClick?: () => void
  isHighlighted?: boolean
  index?: number
  isArenaCard?: boolean
}) {
  const [valueChanged, setValueChanged] = useState(false)
  const prevValueRef = useRef<string | number | undefined>(undefined)
  const { cardActive, playerTurnId } = useBattleContext()

  const disableClick =
    (!isArenaCard && cardActive && index !== Number(cardActive.value)) ||
    (card.owner !== playerTurnId && index !== undefined) ||
    (cardActive?.value.includes('+') && !isArenaCard)

  useEffect(() => {
    if (
      prevValueRef.current !== undefined &&
      prevValueRef.current !== card?.value
    ) {
      setValueChanged(true)
      const t = setTimeout(() => setValueChanged(false), 420)
      prevValueRef.current = card?.value
      return () => clearTimeout(t)
    }
    prevValueRef.current = card?.value
  }, [card?.value])

  return (
    <motion.div
      layout
      layoutId={card.uuid}
      key={card.uuid}
      drag={!disableClick}
      dragSnapToOrigin
      dragElastic
      onDragEnd={onClick}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
      }}
    >
      <MotionCardContainer
        disableClick={disableClick}
        color={getCardColor(card)}
        onClick={onClick}
        isHighlighted={isHighlighted}
      >
        <CardTitle valueChanged={valueChanged}>
          {getCardDisplay(card)}
        </CardTitle>
      </MotionCardContainer>
    </motion.div>
  )
}

export default Card
