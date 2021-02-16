export default class CrHand extends HTMLElement {
    constructor(){
        super()
        this.addEventListener('dragover', e => e.preventDefault())
        this.addEventListener('drop', this.ondrop.bind(this))
    }
    ondrop(e){
        e.preventDefault()
        const cardId = e.dataTransfer.getData('text/plain')
        const card = document.getElementById(cardId)

        this.appendChild(card)
    }
}
customElements.define('cr-hand', CrHand)