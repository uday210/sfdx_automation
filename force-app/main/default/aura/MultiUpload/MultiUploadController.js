({
	handleUploadFinished : function(component, event, helper) {
        
        var uploadedFiles = event.getParam("files");		
        
        console.log(JSON.stringify(uploadedFiles));
         component.set('v.uploadedFiles',uploadedFiles);
	},
    doCustomize: function(component, event, helper) {
        
        var selectedItem = event.currentTarget;
        var recId = selectedItem.dataset.currentid;
        helper.getVersionId(component, event, helper,recId);
       // component.set('v.currentRecordId',recId);
     //   component.set('v.isOpen',true);
    },
    doDelete: function(component, event, helper) {
                var selectedItem = event.currentTarget;
        var recId = selectedItem.dataset.currentid;
        helper.deleteVersion(component, event, helper,recId);

    },
    closeModel:function(component, event, helper) {
          component.set('v.isOpen',false);
    },
    doChange:function(component, event, helper) {
     //   alert();
                 var selectedItem = event.currentTarget;
    //     var rowIndex = event.currentTarget.parentElement.parentElement.id ;
      //  console.log("Row No : " + rowIndex);
        //  var recId = selectedItem.dataset.id;
   //     alert(recId);
    },
    doSave:function(component, event, helper) {
     var record = component.find('formData');
var res = record.submit();   
    }
})