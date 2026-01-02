import type { CardInBattle } from './cads'
import type { Player, PlayerInBattle } from './player'

export type Room = {
  id: string
  name: string
  playerOne: PlayerInBattle | null
  playerTwo: PlayerInBattle | null
  lastCardsUsed: Array<CardInBattle>
  deck: Array<CardInBattle>
  turn: number
  playerTurnId: string
  cardActive: CardInBattle | undefined
  loading: Array<string>
  yourPlayer: Player | undefined
}
