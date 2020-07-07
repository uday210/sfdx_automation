import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getListUi } from 'lightning/uiListApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import greet from '@salesforce/apex/MyClassA.greet';
const utility = {
    'toast': ShowToastEvent,
    'listView':getListUi
}

export default {utility,ShowToastEvent,getListUi,getObjectInfo,getPicklistValues,greet};