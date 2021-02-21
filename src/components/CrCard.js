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
        
        this.value = this.innerText
        this.suite = this.getSuite()
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
        if(cardId == this.id){
            return
        }
        const card = document.getElementById(cardId)
        card.parentElement.removeChild(card)

        this.parentElement.insertBefore(card,this)
    }
    
    getSuite(){
        const classAttr = this.getAttribute('class')
        
        switch(classAttr){
            case 'joker':
                this.value = 'joker'
                return 'joker'
            case 'covered':
                return null
            default:
                return classAttr.substring(6,classAttr.length)
        }
    }
}
customElements.define('cr-card', CrCard)

CrCard.PLACEHOLDER.classList.add('card-placeholder')
CrCard.PLACEHOLDER.ondragenter  = e => e.stopPropagation()
CrCard.PLACEHOLDER.ondrop       = e => {
    if(!!CrCard.PLACEHOLDER.nextElementSibling){
        CrCard.PLACEHOLDER.nextElementSibling.drop(e)
    }
} 
