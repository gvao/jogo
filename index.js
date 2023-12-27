import { Canvas } from './core/entity/Canvas.js'
import { Game } from './core/entity/Game.js'
import { View } from './core/entity/View.js'

const canvas = new Canvas({ divider: 20 })
const view = new View()
const game = new Game(canvas, view)

view.playAgainClick(event => {
    console.log(`button`, event)
    game.init()
})

game.init()

