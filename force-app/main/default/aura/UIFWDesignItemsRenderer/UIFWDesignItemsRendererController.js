/**
 * Created by x213555 on 7/10/19.
 */
({
    flicker: function flicker(component, event, helper) {
        component.set('v.flicker', false);
        component.set('v.flicker', true);
        event.stopPropagation();
    },
})