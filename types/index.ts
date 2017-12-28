
enum Suit {
    Club = 1,
    Diamond,
    Heart,
    Spade
}

interface Card {
    suit: Suit
    order: number
}
