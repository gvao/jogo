import { Position } from "./position.js"

class Observer {
    listeners = []

    emit = () => this.listeners.forEach(listener => listener(this))
    on = listener => this.listeners.push(listener)
}

export class Snake {
    /** @type {Position[]} */
    length = 0
    positions = []
    direction = "ArrowRight"
    #interval
    velocity = 500

    constructor(positionX, positionY) {
        const positionInitial = new Position(positionX, positionY)
        this.positions.push(positionInitial)

        const { on, emit } = new Observer
        this.on = on
        this.emit = emit

        document.addEventListener('keydown', ({ key }) => {
            this.changeDirection(key)
        })
    }

    get head() {
        const length = this.positions.length
        return this.positions[length - 1]
    }

    newPosition = {
        ArrowRight: () => new Position(this.head.x + 1, this.head.y),
        ArrowLeft: () => new Position(this.head.x - 1, this.head.y),
        ArrowUp: () => new Position(this.head.x, this.head.y - 1),
        ArrowDown: () => new Position(this.head.x, this.head.y + 1),
    }

    changeDirection(direction) {
        if (!this.newPosition[direction]) return
        if (this.direction === direction) return

        if (this.direction === 'ArrowDown' && direction === 'ArrowUp') return
        if (this.direction === 'ArrowUp' && direction === 'ArrowDown') return
        if (this.direction === 'ArrowLeft' && direction === 'ArrowRight') return
        if (this.direction === 'ArrowRight' && direction === 'ArrowLeft') return
        
        this.direction = direction
    }

    /**
     * @param {Position} position 
    */
    eat() {
        const position = this.positions[0]
        this.positions.unshift(position)
        this.velocity = this.velocity * 0.9
        this.stop()
        this.run()
    }

    /** @returns {Position} */
    getNewPosition = () => this.newPosition[this.direction]()

    /**
     * @param {Position} limit 
     * @param {() => void} callBack 
     */
    run(limit = this.limit) {
        this.limit = limit
        this.#interval = setInterval(() => {
            this.move(this.limit)
            this.emit()
        }, this.velocity)
    }

    move(limit) {
        const newPosition = this.getNewPosition()

        const isPositionLimitX = newPosition.x >= limit.x
        const isPositionLimitY = newPosition.y >= limit.y

        if (isPositionLimitX || newPosition.x < 0) {
            newPosition.x = isPositionLimitX ? 0 : limit.x
        }
        if (isPositionLimitY || newPosition.y < 0) {
            newPosition.y = isPositionLimitY ? 0 : limit.y
        }

        this.positions.push(newPosition)
        this.positions.shift()
    }

    stop() {
        clearInterval(this.#interval)
    }

}
