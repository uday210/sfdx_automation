/**
 * Created by x213555 on 5/16/19.
 */
({
    openModal: function(component, event, helper) {
        let target = component.get('v.callingComp').find(component.get('v.target'));
        if (Array.isArray(target)) {
            target=target[0];
        }
        target.get('modal.open').execute();
    }
})