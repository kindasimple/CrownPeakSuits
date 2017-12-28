import { Card } from './types'
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
export function decodeCard(card: string): Card {
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

/**
 * Return an enumerated value of the card suit
 * @param card encoded representation of a card
 * @returns The suit enumeration of the encoded card value
 */
function cardToSuit(card: string): Suit {
    switch(card.toLowerCase()) {
        case "h": return Suit.Heart
        case "d": return Suit.Diamond
        case "c": return Suit.Club
        case "s": return Suit.Spade
        default: throw Error("invalid suit: " + card.toLowerCase())
    }
}

/**
 * Convert an encoded hand to an array of cards
 * @param input String representation of a hand
 * @returns An array of cards
 */
export function decodeHand(input: string): Array<Card> {
    const cards = input.split(' ')
    return cards.map(decodeCard)
} 

/**
 * Accumulate the values and suits
 * @param cards 
 */
export function detectFeatures(cards: Array<Card>): [ Map<string, number>, Map<string, Array<number>>] {
    let orderMap = new Map()
    let suitMap = new Map()
    cards.forEach(function(card) {
        if(!orderMap.has(card.order)) {
            orderMap.set(card.order, 1)
        } else {
            orderMap.set(card.order, orderMap.get(card.order)+1)
        }

        if(!suitMap.has(card.suit)) {
            suitMap.set(card.suit, [card.order])
        } else {
            suitMap.get(card.suit).push(card.order)
        }
    })

    return [orderMap, suitMap]
}