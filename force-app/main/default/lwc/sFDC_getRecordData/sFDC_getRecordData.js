import { LightningElement,wire,api } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import { getPicklistValues } from 'c/globalutil';
import {Name,Type} from 'c/globalAccountFields';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import {utility} from 'c/globalutil';
import { getObjectInfo } from 'c/globalutil';
import { getListUi } from 'c/globalutil';
import { greet } from 'c/globalutil';

export default class SFDC_getRecordData extends LightningElement {
/** The delay used when debouncing event handlers before invoking Apex. */
 DELAY = 300;

    @api recordId;
    @api objectApiName;

    @wire(getRecord,{recordId:'$recordId',fields:[Name,Type]})
    record(data){
        console.log('data');
        console.log(data);
    }


    imurl = '';
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo(data){
        console.log('obj data');
        console.log('data>> ',data.data);
        console.log('ACCOUNT_OBJECT');
       this.imurl = data.data?data.data.themeInfo.iconUrl:'';
    }

    get imageurl(){
        return this.objectInfo.data?this.objectInfo.data.themeInfo.iconUrl:'';
    }

    connectedCallback(){
        console.log('********* RECORD DATA API  **************');
        console.log(this.record.data);
        console.log(Type,Name);
        console.log('********* END OF RECORD DATA **************');
    }
   
    handleReset() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach((field) => {
                console.log('field ',field);
                field.reset();
            });
        }
     }

     showtoast(){
        this.dispatchEvent(
            new utility.toast({
                title: 'Success',
                message: 'Dynamically imported showtoast',
                variant: 'success'
            })
        );
     }

     //wire adapter for uiListApi for list view
     @wire(getListUi,{objectApiName:'Account'})
     AccountListView (data){
         console.log('LIST UI data ALL ',data);
     }

      //wire adapter for picklistValues
      @wire(getPicklistValues,{ recordTypeId:'0126F000001vFRuQAM',fieldApiName:'Account.Type'})
      picklistData (data){
          console.log('TYPE picklist Values>> ACC TYPE  ',data);
      }

nameis = 'UDAY KIRAN';
      //call apex method with wire
      @wire(greet,{'name':'$nameis'})
      gotname(data){
          console.log('CALLING APEX FROM WIRE');
          console.log('CALLING APEX FROM WIRE' ,data);
      }
      
      changename(){
        window.clearTimeout(this.delayTimeout);
        this.delayTimeout = setTimeout(() => {
            this.nameis = 'BUSSA 123';
        }, this.DELAY);
      }
      changewithoutdelay(){
       
            this.nameis = 'BUSSA delay';
       
      }

      sayhello(name){
          alert('HELLO'+name);
      }
}