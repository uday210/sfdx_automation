/**
 * Created by x213555 on 5/24/19.
 */
({
    propChanges: function(component, event, helper) {
        let refreshParentEvent = component.getEvent("refresh");
        refreshParentEvent.fire();
    }
})