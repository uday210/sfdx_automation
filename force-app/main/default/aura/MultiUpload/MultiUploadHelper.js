({
	getVersionId : function(cmp,event,helper,ContentDocId) {
		 var action = cmp.get("c.getVersionId");
        action.setParams({ CDId : ContentDocId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
              // alert("From server: " + response.getReturnValue());
                cmp.set('v.currentRecordId',response.getReturnValue());
        		cmp.set('v.isOpen',true);
    		}
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
		 $A.enqueueAction(action);	
	},
    deleteVersion : function(cmp,event,helper,ContentDocId) {
		 var action = cmp.get("c.deleteVersionId");
        action.setParams({ CDId : ContentDocId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            alert(state);
            var uploadedFilesAre  = cmp.get('v.uploadedFiles');
            var index = 0;
            var currentindex = 0;
            if (state === "SUCCESS") {
                uploadedFilesAre.forEach(function(eachItem){
                    if(eachItem.documentId == ContentDocId){
                        index = JSON.parse(JSON.stringify(currentindex));
                      //  break;   
                    }
                    currentindex++;
                });
                
                if(index)
                  uploadedFilesAre.splice(index,1);  
                
               cmp.set('v.uploadedFiles',uploadedFilesAre); 
    		}
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
		 $A.enqueueAction(action);	
	}
})