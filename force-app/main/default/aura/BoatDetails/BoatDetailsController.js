({
	onBoatSelected : function(component, event, helper) {
		var boat = event.getParam('boat');
        component.set("v.boat" ,  boat);
        component.set("v.id" , component.get("v.boat.Id")) ;
        component.find('service').reloadRecord();
	},
    
    onRecordUpdated : function(component, event, helper) {
        
    }, 
    
    onBoatReviewAdded : function(component, event, helper) {
      //  component.set('v.selectedTabId', 'Reviews');
        component.set('v.selectedTabId', 'boatreviewtab');
       component.find('boatreviewtab').refresh();
    }
})