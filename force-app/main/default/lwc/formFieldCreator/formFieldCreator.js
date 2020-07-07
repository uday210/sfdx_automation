import { LightningElement,track,api } from 'lwc';

export default class FormFieldCreator extends LightningElement {
    @track
    eachFieldData
    @track
    eachField
    @api
    get fielddetails() {
        return this.eachField;
    }
    set fielddetails(value) {
       this.eachField = value;//.toUpperCase();
    }

    dataUpdate(event){
  //     alert(event.target.value);

       this.dispatchEvent(new CustomEvent('datapopulated',{ detail: {'data':event.target.value,'field':this.eachField.Label} }));
  
    }

 
}