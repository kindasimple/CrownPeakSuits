/** An enumeration for the set of suits */
export const enum Suit {
    Club = "c",
    Diamond = "d",
    Heart = "h",
    Spade = "s"
}

export interface Card {
    suit: Suit
    order: number
}