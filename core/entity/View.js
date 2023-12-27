
export class View {
    popup = document.querySelector('.popup')
    playAgainButton = document.querySelector('.play-again')

    /** @param {Element} element  */
    #show(element) {
        element.dataset.hide = false
    }
    #hide(element) {
        element.dataset.hide = true
    }

    showPopup = (content) => {
        const text = this.popup.querySelector('.popup__content h2')
        text.textContent = content
        this.#show(this.popup)
    }

    hidePopup() {
        this.#hide(this.popup)
    }

    /**
     * @param {EventListenerOrEventListenerObject} listener 
     */
    playAgainClick(listener) {
        this.playAgainButton.addEventListener('click', listener)
    }
}
