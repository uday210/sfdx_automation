import { LightningElement,api } from 'lwc';

export default class Childcmp extends LightningElement {

    @api 
    parentaction;


    callparent(){
            
        this.parentaction('may work');

    }
}