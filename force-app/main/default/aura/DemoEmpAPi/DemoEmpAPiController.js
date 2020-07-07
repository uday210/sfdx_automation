({
	   onInit : function(component, event, helper) {
        // Register error listener for the empApi component.
        const empApi = component.find("empApi");
        // Error handler function that prints the error to the console.
        const errorHandler = function (message) {
            console.error("Received error ", JSON.stringify(message));
            
        };
        // Register error listener and pass in the error handler function.
        empApi.onError(errorHandler);
		helper.helperSubscribe(component, event, helper);
      
    },

})