import { 
    detectFeatures, 
    detectHands, 
} 
from './detect'

import { Card, Suit } from './types'


/**
 * Convert an encoded set of cards into the best hand
 * @param hand An encoded set of cards
 * @returns The best hand in the set
 */
export function getHand (hand: string): string {
    const cards = decodeHand(hand)
    let [orderMap, suitMap] = detectFeatures(cards)
    let hands = detectHands(orderMap, suitMap)
    let bestHand = getBestHand(hands)
    return getHandName(bestHand, hands[bestHand])
}

/**
 * Convert a card encoding to a Card Object
 * @param card String representation of a card, e.g. Jh
 * @returns A card object with order and suit
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



const handRanks = ["high", "two", "twoPair", "three", "straight", "flush", "fullHouse", "four", "straightFlush", "royalFlush"]

/**
 * Return the best hand in the object
 * @param hands An object with hands in the set of cards
 * @returns The key to the highest-ranked hand
 */
export function getBestHand(hands: Object): string {
    const bestHands = Object.keys(hands).sort((a,b) => handRanks.indexOf(a) - handRanks.indexOf(b))
    return bestHands.pop()
}

/**
 * A print-friendly string for a hand
 * @param hand The identifier for a hand
 * @param value A value associated with the hand
 */
export function getHandName(hand: string, value: any): string {
    switch(hand) {
        case "high": return getCardFromOrder(value.shift()) + " High"
        case "two": return "Pair of " + getCardFromOrder(value.shift()) + "s"
        case "twoPair": return "2 Pair"
        case "three": return "Three " + getCardFromOrder(value.shift()) + "s"
        case "straight": return "straight " + getCardFromOrder(value.shift()) + " high"
        case "flush": return "Flush"
        case "fullHouse": return "Full House"
        case "four": return "Four " + getCardFromOrder(value.shift()) + "s"
        case "straightFlush": return "Straight Flush"
        case "royalFlush": return "Royal Flush"
        default: throw new Error(hand + " is not handled")
    }
}

/**
 * Get the card face value from the card's position in order
 * @param order The order of the card
 * @returns The value on the card
 */
export function getCardFromOrder(order: number): string {
    if(order <= 10) {
        return order.toString(10)
    } else {
        switch(order) {
            case 11: return "Jack"
            case 12: return "Queen"
            case 13: return "King"
            case 14: return "Ace"
        }
    }
}