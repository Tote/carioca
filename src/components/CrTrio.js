import CrHand from './CrHand.js'

export default class CrTrio extends CrHand {
    constructor(){
        super()
        this.cards = this.children
    }

    validate(){
        this.removeValidation()
    
        if(this.children.length < 3){
            this.classList.add('validation-inprogress')
            return
        }

        let i = 0
        let targetValue
        do{
            targetValue = this.children[i++].value
        }while( targetValue == 'joker')
        
        for( i = 0; i < this.children.length; i++){
            if(this.children[i].value != targetValue && this.children[i].value != 'joker'){
                this.classList.add('validation-failed')
                return
            }
        }
        this.classList.add('validation-ok')
    }
    
    removeValidation(){
        this.classList.remove('validation-failed', 'validation-ok', 'validation-inprogress')
    }

    drop(e){
        super.drop(e)
        this.validate()
    }

    removeChild(child){
        super.removeChild(child)
        this.validate()
    }
}
customElements.define('cr-trio', CrTrio)