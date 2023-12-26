import { Canvas } from './core/entity/Canvas.js'
import { Game } from './core/entity/Game.js'

const canvas = new Canvas({ divider: 8 })
const game = new Game(canvas)

game.init()