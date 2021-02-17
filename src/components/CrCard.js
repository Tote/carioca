export default class CrCard extends HTMLElement {
    
    static PLACEHOLDER = document.createElement('div')
    constructor(){
        super()
        if(!this.classList.contains('covered')){
            this.setAttribute('draggable', 'true')
        }
        this.addEventListener('dragstart', this.dragStart.bind(this))
        this.addEventListener('dragenter', this.dragEnter.bind(this))
        this.addEventListener('drop', this.drop.bind(this))

        this.placeholder = null
    }
    dragStart(e){
        e.dataTransfer.setData('text/plain', this.id)
    }
    dragEnter(e){
        e.stopPropagation()
        this.parentElement.insertBefore(CrCard.PLACEHOLDER,this)
    }
    dragLeave(e){
        this.parentElement.removeChild(CrCard.PLACEHOLDER)
    }
    drop(e){
        e.preventDefault()
        e.stopPropagation()
        this.dragLeave(e)
        const cardId = e.dataTransfer.getData('text/plain')
        const card = document.getElementById(cardId)

        this.parentElement.insertBefore(card,this)
    }
    dragEnter(e){
        this.parentElement.insertBefore(CrCard.PLACEHOLDER,this)
    }
    dragLeave(e){
        this.parentElement.removeChild(CrCard.PLACEHOLDER)
    }
    drop(e){
        e.preventDefault()
        e.stopPropagation()
        this.dragLeave(e)
        const cardId = e.dataTransfer.getData('text/plain')
        const card = document.getElementById(cardId)

        this.parentElement.insertBefore(card,this)
    }
}
customElements.define('cr-card', CrCard)

CrCard.PLACEHOLDER.classList.add('card-placeholder')
CrCard.PLACEHOLDER.ondrop       = e => CrCard.PLACEHOLDER.nextElementSibling.drop(e)
CrCard.PLACEHOLDER.ondragenter  = e => e.stopPropagation()
