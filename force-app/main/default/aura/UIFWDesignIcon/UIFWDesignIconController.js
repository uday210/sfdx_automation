/**
 * Created by x213555 on 6/17/19.
 */
({
    onInit: function(component, event, helper) {
        let type = component.get('v.type');
        type = uifwComponents[type];
        if (type) {
            component.set('v.iconName', type.icon);
            component.set('v.displayName', type.displayName);
        }
        else {
            component.set('v.iconName', 'utility:error');
            component.set('v.displayName', 'Unsupported');
        }
    },
})