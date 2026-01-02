import { CardInBattle } from "./cads";

export interface Player {
  id: string;
  name: string;
}

export interface PlayerInBattle extends Player {
  deck: CardInBattle[];
}
