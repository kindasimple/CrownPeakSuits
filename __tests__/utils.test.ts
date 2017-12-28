import { decodeCard, decodeHand, detectFeatures } from '../utils'
import { Suit } from '../types'

describe("Decodes hands", () => {
    const suits = [
        "c",
        "d",
        "h",
        "s",
    ]
    
    it("decodes small cards", () => {
        const values = [2,3,4,5,6,7,8,9,10]
        suits.forEach(function(s){
            values.forEach(function(v) {
                let suit = suits.indexOf(s)+1
                expect(decodeCard(`${v}${s}`)).toEqual({ suit, order: v})
            })
        })
    })

    it("decodes face cards", () => {
        const values = ["J", "Q", "K", "A"]
        const orders = [11, 12, 13, 14]

        suits.forEach(function(s){
            values.forEach(function(v, idx) {
                let suit = suits.indexOf(s)+1
                expect(decodeCard(`${v}${s}`)).toEqual({ suit, order: orders[idx] })
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

    it("detects features", () => {
        const input = [
            { suit: Suit.Heart, order: 3}, 
            { suit: Suit.Heart, order: 4 },
            { suit: Suit.Diamond, order: 4 },
        ]
        const valueHash = new Map([[3, 1], [4, 2]])
        const suitsHash = new Map([[3, [3, 4]], [2, [4]]])
        const expected = [valueHash, suitsHash]
        
        expect(detectFeatures(input)).toEqual(expected)
    })
})