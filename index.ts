import { getHand } from './suits'

// handle parameters passed from commandline and output spiral
if (require.main === module) {
    let cards = process.argv[2]
    if(cards) {
        const result = getHand(process.argv[2])
        console.log(result)
    }
}

