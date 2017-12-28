
export enum Suit {
    Club = 1,
    Diamond,
    Heart,
    Spade
}

export interface Card {
    suit: Suit
    order: number
}
