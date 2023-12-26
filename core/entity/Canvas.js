/** 
 * @typedef {object} Props 
 * @property {number} divider
 * @property {string} color
*/

export class Canvas {
    #screen = document.querySelector("canvas");
    #context = this.#screen.getContext("2d");
    color = "green"
    divider = 5

    /** @param {Props} */
    constructor({ divider }) {
        this.divider = divider
        this.picturesSize = this.#screen.width / this.divider;
    }

    draw({ x, y }, color) {

        if (x >= this.divider || y >= this.divider) return

        this.#context.fillStyle = color || this.color
        this.#context.fillRect(
            x * this.picturesSize,
            y * this.picturesSize,
            this.picturesSize,
            this.picturesSize
        )
    }

    clearAll() {

        this.#context.clearRect(
            0,
            0,
            this.#screen.width,
            this.#screen.width,
        )
    }
}
