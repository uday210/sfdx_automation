/**
 * Created by x213555 on 6/4/19.
 */
({
    flicker: function(component, event, helper) {
        component.set('v.flicker', false);
        component.set('v.flicker', true);
    }
})