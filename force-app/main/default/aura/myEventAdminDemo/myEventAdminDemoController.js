({
	onCometdLoaded : function(component, event, helper) {
        console.log('>>> cometd scripts');
  var cometd = new org.cometd.CometD();
  component.set('v.cometd', cometd);
 // if (component.get('v.sessionId') != null)
    helper.connectCometd(component,event,helper);
},

})