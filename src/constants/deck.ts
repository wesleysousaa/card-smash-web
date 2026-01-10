import { v4 as uuidv4 } from 'uuid'
import type { Card } from '@/types/cads'
import type { CardColor } from './colors'

const colors: Array<CardColor> = ['blue', 'green', 'red', 'yellow']
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const specialCards = ['🔁', '+2', '🚫', '+4', '📚']

export const GlobalDeck: Array<Card> = [
  ...colors
    .map((color) => {
      const items = numbers.map((number) => ({
        id: `${color}-${number}`,
        value: `${number}`,
        color: color,
        uuid: uuidv4(),
      }))
      return items
    })
    .flat(),
  ...colors
    .map((color) => {
      const items = specialCards.map((card) => ({
        id: `${color}-${card}`,
        value: `${card}`,
        color: color,
        uuid: uuidv4(),
      }))
      return items
    })
    .flat(),
]
