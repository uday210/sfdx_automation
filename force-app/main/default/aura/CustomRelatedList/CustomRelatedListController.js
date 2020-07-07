({
	handleSubmit : function(cmp, event, helper) {
        event.preventDefault();       // stop the form from submitting
       // alert('data submitting');
        const fields = event.getParam('fields');
        var tab2fields= ['My_question_1__c','My_Question_2__c'];
        tab2fields.forEach(function(eachFieldId){
            var data = cmp.find(eachFieldId).get('v.value');
          //  alert(data);
            fields[eachFieldId] = data;
        });
        cmp.find('myRecordFormTab1').submit(fields);
    },
    switchTab :function(cmp, event, helper) {
            var selectedItem = event.currentTarget;
          var tab = selectedItem.dataset.tabname;
  cmp.set('v.currentTab',tab);
    }
})