({
	doInit : function(cmp, event, helper) {
        
        var action = cmp.get("c.getAllTabs");
            action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("From server: " , response.getReturnValue());
                var data = response.getReturnValue();
                var names = data.map((e)=>{console.log(e);return e.Label});
                console.log('names ',names);
                cmp.set('v.activeSections',names);
                cmp.set('v.tabs', response.getReturnValue());
                cmp.set('v.renderTabs',true);                           
               

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

        // optionally set storable, abortable, background flag here

        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
		
	},
    openDisplay:function(component,event,helper){
             var selectedItem = event.currentTarget;
          var display = selectedItem.dataset.display;
     /*   alert(display);
        window.open(display,'_blank');
         var workspaceAPI = component.find("workspace");
        console.log(workspaceAPI);
        workspaceAPI.openTab({
            url: display,
            focus: false
        }).then(function(response) {
            console.log('response',response);
            workspaceAPI.getTabInfo({
                tabId: response
            }).then(function(tabInfo) {
            console.log("The recordId for this tab is: " + tabInfo.recordId);
            });
        }).catch(function(error) {
                console.log(error);
        });
       */ 
    }
})