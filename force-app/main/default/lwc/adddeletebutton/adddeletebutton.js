import { LightningElement, api,track } from 'lwc';

export default class Adddeletebutton extends LightningElement {
    @track
    rowindex;
    @track
    totalrows;
    @api
    get item() {
        return this.rowindex;
    }
    set item(value) {
       this.rowindex = value;//.toUpperCase();
    }
    @api
    get allrows() {
        return this.totalrows;
    }
    set allrows(value) {
       this.totalrows = value;//.toUpperCase();
    }

    addrow(){

            this.dispatchEvent(new CustomEvent('add'));
      
    }
    deleterow(){

        this.dispatchEvent(new CustomEvent('delete',{ detail: this.rowindex }));
  
    }

    get displayshow(){
        return this.rowindex===(this.totalrows-1)
    }

    get displayDelete(){
        return  this.rowindex!==0
    }
}