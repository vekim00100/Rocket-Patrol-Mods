// Vivian Kim
// Rocket Patrol v.2
// 8 hrs

// Create new ememy Spaceship (5 pts)
// Implement mouse controls (5 pts)
// Implement a new timing/scoring mechanism that adds time to the clock for successful hits 
// and subtracts time for misses (5 pts)
// Display the time remaining (in seconds) on the screen (3 pts)
// Create a new title screen (e.g., new artwork, typography, layout) (3 pts)

// enemyship art credits: https://www.pixilart.com/draw/rocket-ship-584674f4ef5a427

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT, keyLOCK