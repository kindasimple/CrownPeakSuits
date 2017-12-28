import { Card } from './types'

/**
 * Get the value counts and suit lists for a set of cards
 * @param cards 
 * @returns Tupple of maps with features
 * - map or order counts
 * - map of suit value lists
 */
export function detectFeatures(cards: Array<Card>): [ Map<number, number>, Map<string, Array<number>>] {
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

/**
 * Detect hands in feature mapping of a set of cards
 * @param orderMap Card counts by order number
 * @param suitMap Card sets by suit
 */
export function detectHands(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>): Object {
    let results = {}
    var hands = [
        detectHigh, detectTwo, detectThree, detectTwoPair, 
        detectFour, detectFlush, detectStraight, detectStraightFlush, 
        detectFullHouse, detectRoyalFlush
    ]
    hands.forEach(function(hand) {
        results = hand.call(this, orderMap, suitMap, results)
    })
    return results
}

/**
 * Detect a high
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectHigh(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    let high = Array.from(orderMap.keys()).sort((a,b) => b-a) 
    return Object.assign({}, hands, { high })
}

/**
 * Detect a pair
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectTwo(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    let two = Array.from(orderMap.keys())
                    .filter(function (key) { return orderMap.get(key) === 2 })
    if(two.length > 0) {
        return Object.assign({}, hands, { two })
    } else {
        return hands
    }
}

/**
 * Detect three of a kinds
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectThree(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    let three = Array
                    .from(orderMap.keys())
                    .filter(function (key) { return orderMap.get(key) === 3 }) 
    if(three.length > 0) {
        return Object.assign({}, hands, { three })
    } else {
        return hands
    }
}

/**
 * Detect four of a kind
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectFour(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    let four = Array
                .from(orderMap.keys())
                .filter(function (key) { return orderMap.get(key) === 4 }) 
    if(four.length > 0) {
        return Object.assign({}, hands, { four })
    } else {
        return hands
    }
}

/**
 * Detect flush
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectFlush(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    let flush = Array
                .from(suitMap.keys())
                .filter(function (key) { return suitMap.get(key).length === 5 }) 
    if(flush.length > 0) {
        return Object.assign({}, hands, { flush })
    } else {
        return hands
    }
}

/**
 * Detect straight
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectStraight(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    let keys = Array.from(orderMap.keys())
    if(keys.length >= 5) {
        let sortedHand = keys.sort()
        
        if(sortedHand[4] - sortedHand[0] === 4) {
            return Object.assign({}, hands, { straight: sortedHand[4] })
        } else {
            return hands
        }
    } else {
        return hands
    }
}

/**
 * Detect straight
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectStraightFlush(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    if(hands.hasOwnProperty("straight") && hands.hasOwnProperty("flush")) {
        return Object.assign({}, hands, { straightFlush: hands["straight"] })
    } else {
        return hands
    }
}

/**
 * Detect Two Pair
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectTwoPair(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    if(hands.hasOwnProperty("two") && hands["two"].length === 2) {
        return Object.assign({}, hands, { twoPair: true })
    } else {
        return hands
    }
}

/**
 * Detect Royal Flush
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectRoyalFlush(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    if(hands.hasOwnProperty("straightFlush") && hands["straightFlush"] === 14) {
        return Object.assign({}, hands, { royalFlush: true })
    } else {
        return hands
    }
}


/**
 * Detect straight
 * @param orderMap 
 * @param suitMap 
 * @param hands 
 */
export function detectFullHouse(orderMap: Map<number, number>, suitMap: Map<string, Array<number>>, hands: Object): Object {
    if(suitMap.get("three") && suitMap.get("two")) {
        return Object.assign({}, hands, { fullHouse: true })
    } else {
        return hands
    }
}