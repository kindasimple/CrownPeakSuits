import { decodeHand } from '../utils'

describe("Decodes hands", () => {
    const suits = [
        "c",
        "d"
        "h",
        "s",
    ]
    
    it("decodes small cards", () => {
        const values = [2,3,4,5,6,7,8,9,10]
        suits.forEach(function(s){
            values.forEach(function(v) {
                let suit = suits.indexOf(s)+1
                expect(decodeHand(`${v}${s}`)).toEqual({ suit, order: v})
            })
        })
    })

    it("decodes face cards", () => {
        const values = ["J", "Q", "K", "A"]
        const orders = [11, 12, 13, 14]

        suits.forEach(function(s){
            values.forEach(function(v, idx) {
                let suit = suits.indexOf(s)+1
                expect(decodeHand(`${v}${s}`)).toEqual({ suit, order: orders[idx] })
            })
        })
    })
})