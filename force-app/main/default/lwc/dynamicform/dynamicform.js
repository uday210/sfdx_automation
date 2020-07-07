import { LightningElement, track } from "lwc";
export default class Dynamicform extends LightningElement {
  formEnteredData = {};
   @track
  fieldsData = [
    { Label: "First Name", id: "First_Name", Type: "Text" },
    { Label: "Last Name", id: "Last_Name", Type: "Text" },
    { Label: "Email", id: "Email", Type: "Text" }
  ];
  sayhello() {
    console.log(this.formEnteredData);
  }
  datafromfield(event){
    const data = event.detail;
  //  console.log('data ',data);
    this.formEnteredData[data.field] = data.data;
  }
}