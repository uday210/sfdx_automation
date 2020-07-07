import { LightningElement, track } from 'lwc';
const columns = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];

export default class DemoTable extends LightningElement {

    @track data = [];
    @track columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
      //  const data = await fetchDataHelper({ amountOfRecords: 100 });
        this.data = [{
            "name":"name"
        }];
    }
}