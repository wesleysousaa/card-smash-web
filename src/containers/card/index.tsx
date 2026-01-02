import React, { useEffect, useRef, useState } from 'react'
import { CardContainer, CardTitle } from './styles'
import { CardBattleStatus, type CardInBattle } from '@/types/cads'
import { getCardColor, getCardDisplay } from '@/utils/card'
import { useBattleContext } from '@/context/BattleContext'

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
    (card.owner !== playerTurnId && index !== undefined)

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
    <CardContainer
      disableClick={disableClick}
      color={getCardColor(card)}
      onClick={onClick}
      isHighlighted={isHighlighted}
    >
      <CardTitle valueChanged={valueChanged}>{getCardDisplay(card)}</CardTitle>
    </CardContainer>
  )
}

export default Card
