({
    // Called when your custom component is initialized.
    // Registers error handler for the empApi component.
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

    // Client-side function that invokes the subscribe method on the
    // empApi component.
    subscribe : function(component, event, helper) {
       helper.helperSubscribe(component, event, helper);
         },

    // Client-side function that invokes the unsubscribe method on the
    // empApi component.
    unsubscribe : function(component, event, helper) {
        // Get the empApi component.
        const empApi = component.find("empApi");
        // Get the channel from the subscription object.
        const channel = component.get("v.subscription").channel;

        // Callback function to be passed in the subscribe call.
        const callback = function (message) {
            console.log("Unsubscribed from channel " + channel);
        };

        // Unsubscribe from the channel using the sub object.
        empApi.unsubscribe(component.get("v.subscription"), callback);
    }
})