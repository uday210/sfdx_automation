import { LightningElement,api,track } from 'lwc';

export default class CustomGrid extends LightningElement {

    @api rows = 5;
    @api columns = 5;

    @track rowsArray = [];
    @track columnsArray = [];

    connectedCallback() {
       for(var i=0;i<this.rows;i++){
            this.rowsArray.push({'id':i,'assci':i});
       }
       for(var i=0;i<this.columns;i++){
     //   this.columnsArray.push(i);
     var ascciI = 65+i;
     this.columnsArray.push({'id':i,'assci':i});
      
      
      
    }
    }

    onhoverofapp(){
        alert();
    }
}