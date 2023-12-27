import { Canvas } from './Canvas.js';
import { Snake } from './Snake.js';
import { Fruit } from './Fruit.js';
import { Position } from './position.js';
import { View } from './View.js';

export class Game {
    /** @type {Snake} */
    snake;
    /** @type {Canvas} */
    canvas;
    /** @type {Fruit} */
    fruit
    /** @type {View} */
    view

    constructor(canvas, view) {
        this.canvas = canvas
        this.view = view
        this.limit = new Position(this.canvas.divider, this.canvas.divider)
    }

    init() {
        const { x, y } = this.getRandomPosition()
        this.snake = new Snake(x, y)
        this.view.hidePopup()
        this.addFruit()
        this.drawSnake()
        this.snake.run(this.limit)

        this.snake.on(() => {
            if (this.isFruitCollision()) {
                this.snake.eat()
                this.addFruit()
            }

            if (this.isTailCollision()) {
                console.log("Tail Collision")
                this.gameOver()
            }

            this.render()
        })
    }

    gameOver() {
        this.snake.stop()
        this.view.showPopup(`seu score é ${this.snake.positions.length}`)
    }

    isFruitCollision() {
        const head = this.snake.head
        const fruit = this.fruit.position

        const keys = Object.keys(head)
        const fruitCollision = keys.every(key => fruit[key] === head[key])

        return fruitCollision
    }

    isTailCollision() {
        const { positions, head } = this.snake

        const findIndex = positions
            .findIndex(position => position === head)

        const trail = positions.filter((_, index) => index !== findIndex)

        const result = trail.findIndex(tail => {
            return tail.x === head.x && tail.y === head.y
        })

        return trail.length > 1 && result >= 0
    }

    render() {
        this.canvas.clearAll()
        this.canvas.draw(this.fruit.position, "yellow")
        this.drawSnake()
    }

    drawSnake() {
        this.snake.positions
            .forEach(pos => this.canvas.draw(pos))
        this.canvas.draw(this.snake.head, 'blue')

    }

    addFruit() {

        const positionFruit = this.getRandomPosition()

        const { positions } = this.snake
        const index = positions
            .findIndex(({ x, y }) => {
                return positionFruit.x === x && positionFruit.y === y
            })

        if (index < 0) {
            this.fruit = new Fruit(positionFruit)
            return
        }

        this.addFruit()
    }

    getRandomPosition() {
        const random = () => Math.floor(Math.random() * this.canvas.divider)

        const x = random()
        const y = random()

        return new Position(x, y)
    }

}
