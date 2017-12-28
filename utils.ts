
enum Suit {
    Club = 1,
    Diamond,
    Heart,
    Spade
}

/**
 * Convert a card encoding to a Card Object
 * @param card String representation of a card, e.g. Jh
 */
export function decodeHand(card: string): Card {
    let order = valueToOrder(card.slice(0, -1))
    let suit = cardToSuit(card.slice(-1))
    return {
        order,
        suit,
    }
}

/**
 * Convert a cards value to its order
 * @param value The value of the card
 * @returns The order of the card's value
 */
function valueToOrder(value: string): number {
    switch (value) {
        case "A": return 14
        case "K": return 13
        case "Q": return 12
        case "J": return 11
        default: return parseInt(value, 10)
    }
}

function cardToSuit(card: string): Suit {
    switch(card.toLowerCase()) {
        case "h": return Suit.Heart
        case "d": return Suit.Diamond
        case "c": return Suit.Club
        case "s": return Suit.Spade
        default: throw Error("invalid suit: " + card.toLowerCase())
    }
}