({
	helperSubscribe : function(component, event, helper) {
		// Get the empApi component.
        const empApi = component.find("empApi");
        // Get the channel from the input box.
        var channel = '/data/AccountChangeEvent';
            //component.find("channel").get("v.value");
      //  alert(channel);
        const replayId = -1;

        // Callback function to be passed in the subscribe call.
        // After an event is received, this callback prints the event
        // payload to the console.
        const callback = function (message) {
            var dataIs = component.get('v.changedData');
            
            console.log("Event Received : ",JSON.parse( JSON.stringify(message)));
            dataIs.push(JSON.parse( JSON.stringify(message)).data.payload);
            component.set('v.changedData',dataIs);
        };

        // Subscribe to the channel and save the returned subscription object.
        empApi.subscribe(channel, replayId, callback).then(function(newSubscription) {
            console.log("Subscribed to channel " + channel);
            component.set("v.subscription", newSubscription);
        });
   
	}
})