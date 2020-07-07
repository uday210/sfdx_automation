/**
 * Created by x213555 on 8/23/19.
 */
({
    onRender: function onRender(component, event, helper) {
        if(!component.get('v.open')&&!component.get('v.isAnimating')) {
            component.find('transitionHeight').getElement().style.height = '0';
            component.find('transitionHeight').getElement().style.overflowY='hidden';
        }
    },
    toggle: function toggle(component, event, helper) {
        if (!component.get('v.isAnimating')) {
            component.set('v.animate', true);
            component.set('v.isAnimating', true);
            let callback = function callback() {
                component.find('transitionHeight').getElement().style.height = "auto";
                component.find('transitionHeight').getElement().style.overflowY='unset';
                component.set('v.isAnimating', false);
            };

            component.set('v.open', !component.get('v.open'));
            if (!component.get('v.open')) {
                component.find('transitionHeight').getElement().style.height = component.find('contentContainer').getElement().offsetHeight + 'px';
                component.find('transitionHeight').getElement().style.overflowY='hidden';
                window.setTimeout($A.getCallback(() => {
                    component.find('transitionHeight').getElement().style.overflowY='hidden';
                    component.find('transitionHeight').getElement().style.height = '0';
                    component.set('v.isAnimating', false);
                }), 0);
            } else {
                component.find('transitionHeight').getElement().style.height = component.find('contentContainer').getElement().offsetHeight + 'px';
                component.find('transitionHeight').getElement().style.overflowY='hidden';
                component.find('transitionHeight').getElement().addEventListener('transitionend', callback, {
                    once: true,
                });
            }
        }
    },
})