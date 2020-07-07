import { LightningElement,api,track } from 'lwc';

export default class Genderpicklist extends LightningElement {

    get options() {
        return [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
        this.dispatchEvent(new CustomEvent('genderchange', { detail: {'value':this.value,'index':this.rowindex}}));
    }

    @track
    rowindex;
    @api
    get item() {
        return this.rowindex;
    }
    set item(value) {
       this.rowindex = value;//.toUpperCase();
    }
   

}