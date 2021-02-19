import CrCard from './CrCard.js'

export default class CrHand extends HTMLElement {
    constructor(){
        super()
        this.addEventListener('dragover', e => e.preventDefault())
        this.addEventListener('dragenter', this.dragEnter.bind(this))
        this.addEventListener('drop', this.drop.bind(this))
    }
    dragEnter(e){
        this.appendChild(CrCard.PLACEHOLDER)
    }
    drop(e){
        e.preventDefault()
        this.removeChild(CrCard.PLACEHOLDER)

        const cardId = e.dataTransfer.getData('text/plain')
        const card = document.getElementById(cardId)
        card.parentElement.removeChild(card)

        this.appendChild(card)
    }
}
customElements.define('cr-hand', CrHand)