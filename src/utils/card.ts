import { COLOR_PALETTE, anotherColors } from '@/constants/colors'
import { CardBattleStatus } from '@/types/cads'

export const getCardDisplay = (card: any) => {
  if (
    card.status === CardBattleStatus.BACK ||
    card.status === CardBattleStatus.DECK
  ) {
    return '✨'
  }
  return card.value
}

export const getCardColor = (card: {
  color: keyof typeof COLOR_PALETTE
  status: CardBattleStatus
}) => {
  if (
    card.status === CardBattleStatus.BACK ||
    card.status === CardBattleStatus.DECK
  ) {
    return anotherColors.darkLight
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return COLOR_PALETTE?.[card.color] || '#FFFFFF'
}
