({
    doinit : function(cmp) {
        var action = cmp.get("c.getCmps");
      //  action.setParams({ firstName : cmp.get("v.firstName") });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert("From server: " + response.getReturnValue());
				console.log('response.getReturnValue() ',response.getReturnValue());
                alert(response.getReturnValue()[0].code__c);
                cmp.set('v.htmlCodeis',response.getReturnValue()[0].code__c);
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