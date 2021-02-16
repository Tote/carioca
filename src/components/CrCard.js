export default class CrCard extends HTMLElement {
    constructor(){
        super()
        this.setAttribute('draggable', 'true')
        this.addEventListener('dragstart', this.ondrag.bind(this))
    }
    ondrag(e){
        e.dataTransfer.setData('text/plain', this.id)
        console.log('dragged')
    }
}
customElements.define('cr-card', CrCard)