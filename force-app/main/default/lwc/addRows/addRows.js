import { LightningElement, track } from 'lwc';

export default class AddRows extends LightningElement {

@track
dataRows = [{
    'Name':'',
    'Age':'',
    'Gender':''
}];

handleClick(){
    
    this.dataRows.push({
        'Name':'',
        'Age':'',
        'Gender':''    });
//    console.log('hello');
}

display(){
  //  console.log(index);
    return true;
}

getData(){
}
dataUpdate(event){
   // console.log('event.detail ',event.target.tabindex);
    var selectedItem = event.currentTarget;
    this.dataRows[selectedItem.dataset.index][selectedItem.dataset.field] =  event.target.value;
/*****value = event.target.value;

    var selectedItem = event.currentTarget;
    var recId = selectedItem.dataset.index;
    console.log(recId);
    **********/
}
handleDelete(event){
    const index = event.detail;
    this.dataRows.splice(index,1);
}

downloadascsv(){

     var rows = this.dataRows;
    let csvContent = "data:text/csv;charset=utf-8," 
    +'Name,Age,Gender\r\n' ;   
    rows.forEach(function(rowArray) {
        let row = Object.values(rowArray).join(",");
        csvContent += row + "\r\n";
    });
        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF
        
        link.click();     
    
}

genderdataUpdate(event){
    const details = event.detail;
    this.dataRows[details.index].Gender = details.value;// event.target.value;
}
}