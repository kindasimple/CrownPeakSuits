import { getHand } from './suits'

// handle parameters passed from commandline and output spiral
if (require.main === module) {
    const result = getHand(process.argv[2])
}

