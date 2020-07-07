({
	helperSubscribe : function(component, event, helper) {
		// Get the empApi component.
        const empApi = component.find("empApi");
        var channel = '/event/Demo__e';
        const replayId = -1;

        // Callback function to be passed in the subscribe call.
        // After an event is received, this callback prints the event
        // payload to the console.
        const callback = function (message) {
            var received_data = JSON.parse( JSON.stringify(message));
            console.log("Event Received : ",received_data);//JSON.parse( JSON.stringify(message)));
            component.set('v.receivedData',received_data.data.payload.Data__c);
        };

        // Subscribe to the channel and save the returned subscription object.
        empApi.subscribe(channel, replayId, callback).then(function(newSubscription) {
            console.log("Subscribed to channel " + channel);
            component.set("v.subscription", newSubscription);
        });
   
	}
})