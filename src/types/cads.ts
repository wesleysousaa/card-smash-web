import type { CardColor } from '@/constants/colors'

export enum CardBattleStatus {
  FRONT = 'front',
  BACK = 'back',
  DECK = 'deck',
  ARENA = 'arena',
  HAND = 'hand',
}

export interface Card {
  id: string
  value: string
  color: CardColor
  uuid?: string
}

export interface CardInBattle extends Card {
  owner?: string
  status: CardBattleStatus
}
