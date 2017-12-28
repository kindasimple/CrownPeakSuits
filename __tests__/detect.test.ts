import { detectFeatures, detectHands, detectTwo,
    detectThree, detectFour, detectFlush, detectStraight
} from '../detect'
import { Suit } from '../types'


it("detects features", () => {
    const input = [
        { suit: Suit.Heart, order: 3}, 
        { suit: Suit.Heart, order: 4 },
        { suit: Suit.Diamond, order: 4 },
    ]
    const valueHash = new Map([[3, 1], [4, 2]])
    const suitsHash = new Map([[Suit.Heart, [3, 4]], [Suit.Diamond, [4]]])
    const expected = [valueHash, suitsHash]
    
    expect(detectFeatures(input)).toEqual(expected)
})

it("detects two of kind in a features set", () => {
    const orderMap = new Map([[6,2]])
    const suitMap = new Map([[Suit.Heart, [6]], [Suit.Diamond, [6]]])
    const expected = {
        "two": [6]
    }
    
    expect(detectTwo(orderMap, suitMap, {})).toEqual(expected)
})

it("detects three of kind in a features set", () => {
    const orderMap = new Map([[6,3]])
    const suitMap = new Map([[Suit.Club, [6]], [Suit.Spade, [6]], [Suit.Diamond, [6]]])
    const expected = {
        "three": [6]
    }
    
    expect(detectThree(orderMap, suitMap, {})).toEqual(expected)
})

it("detects four of kind in a features set", () => {
    const orderMap = new Map([[6,4]])
    const suitMap = new Map([[Suit.Heart, [6]], [Suit.Diamond, [6]], [Suit.Spade, [6]], [Suit.Club, [6]]])
    const expected = {
        "four": [6]
    }
    
    expect(detectFour(orderMap, suitMap, {})).toEqual(expected)
})

it("detects hands in a features set", () => {
    const orderMap = new Map([[4, 4], [8,1], [7,1], [6,1], [5,1]])
    const suitMap = new Map([[Suit.Diamond, [8,7,6,5]]])
    const expected = {
        "high": [8,7,6,5,4],
        "four": [4],
        "straight": 8
    }
    
    expect(detectHands(orderMap, suitMap)).toEqual(expected)
})

it("detects Royal Flush in a features set", () => {
    const orderMap = new Map([[14, 1], [13,1], [12,1], [11,1], [10,1]])
    const suitMap = new Map([[Suit.Diamond, [14,13,12,11,10]]])
    const expected = {
        "straight": 14,
        "flush": [Suit.Diamond],
        "straightFlush": 14,
        "royalFlush": true,
        "high": [14,13,12,11,10]
    }
    
    expect(detectHands(orderMap, suitMap)).toEqual(expected)
})

