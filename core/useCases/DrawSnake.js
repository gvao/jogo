import { Canvas } from "../entity/Canvas.js"
import { Snake } from "../entity/Snake.js"

export class DrawSnake {

    #canvas
    #snake

    /**
     * @param {Canvas} canvas
     * @param {Snake} snake
     */
    constructor(canvas, snake) {
        this.#canvas = canvas
        this.#snake = snake
    }

    execute(positions) {
        positions
            .forEach(position => {
                const { divider } = this.#canvas

                console.log({ divider, ...position })

                if (position.x >= divider || position.y >= divider || position.x < 0 || position.y < 0) {
                    this.#snake.stop()
                    return alert(`bateu`, position)
                }

                this.#canvas.draw(position)

            })
    }
}
