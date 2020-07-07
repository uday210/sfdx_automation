({
	doAction : function(component, event, helper) {
		var exeAction1= component.get('c.demo4');
        var exeAction2= component.get('c.demo2');
        var exeAction3= component.get('c.demo3');
        var exeAction4= component.get('c.demo1');
        
        Promise.all([
                        helper.serverSideCall(component,exeAction1),
                        helper.serverSideCall(component,exeAction2),
                        helper.serverSideCall(component,exeAction3),
                        helper.serverSideCall(component,exeAction4)
                  ]).then(function(response) {
            		console.log('response ',response);
           		 	}).catch( function(error) {
                //component.set("v.status" ,error ) ; 
                console.log(error);
            });
	}
})