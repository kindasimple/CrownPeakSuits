import { getHand, getBestHand, decodeCard, decodeHand } from '../suits'
import { Suit, Card } from '../types'

describe("Get Best Suit", () => {
    it("handles example 1", () => {
        const hand = "Ah As 10c 7d 6s"
        const expected = "Pair of Aces"
        expect(getHand(hand)).toEqual(expected)
    })

    it("handles example 2", () => {
        const hand = "Kh Kc 3s 3h 2d"
        const expected = "2 Pair"
        expect(getHand(hand)).toEqual(expected)
    })

    it("handles example 3", () => {
        const hand = "Kh Qh 6h 2h 9h"
        const expected = "Flush"
        expect(getHand(hand)).toEqual(expected)
    })

    it("handles example 4", () => {
        const hand = "Ah Kh Qh Jh 10h"
        const expected = "Royal Flush"
        expect(getHand(hand)).toEqual(expected)
    })
})

describe("decoding", () => {

    const suitsList = [
        Suit.Club,
        Suit.Diamond,
        Suit.Heart,
        Suit.Spade,
    ]

    it("decodes small cards", () => {
        const values = [2,3,4,5,6,7,8,9,10]
        suitsList.forEach(function(suit){
            values.forEach(function(v) {
                expect(decodeCard(`${v}${suit}`)).toEqual({ suit, order: v})
            })
        })
    })

    it("decodes face cards", () => {
        const values = ["J", "Q", "K", "A"]
        const orders = [11, 12, 13, 14]

        suitsList.forEach(function(suit){
            values.forEach(function(v, idx) {
                expect(decodeCard(`${v}${suit}`)).toEqual({ suit, order: orders[idx] })
            })
        })
    })

    it("decodes a hand", () => {
        const hand = "Ah As 10c 7d 6s"
        const orders: Array<Card> = [
            { suit: Suit.Heart, order: 14 },
            { suit: Suit.Spade, order: 14 },
            { suit: Suit.Club, order: 10 },
            { suit: Suit.Diamond, order: 7 },
            { suit: Suit.Spade, order: 6 }
        ]

        expect(decodeHand(hand)).toEqual(orders)
    })


})

describe("Detection", () => {
    it("detects the best hand in a set", () => {
        const hands = { fullHouse: true, pair: [2,4], straightFlush: [10]}
        const expected = "straightFlush"
        
        expect(getBestHand(hands)).toEqual(expected)
    })
})