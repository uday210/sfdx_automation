/**
 * Created by x213555 on 8/28/19.
 */
({
    init: function init(component, event, helper) {
        component.set('v.allowedBrokers', component.find('accountBroker').getBrokers());
        component.set('v.flicker', true);
    },
    flicker: function flicker(component, event, handler) {
        component.set('v.flicker', false);
        component.set('v.flicker', true);
    },
    changeDataSourceType: function changeDataSourceType(component, event, helper) {
        component.set('v.flicker', false);
        switch(component.get('v.item.dataSourceType')) {
            case 'broker': {
                if(!(component.get('v.item.dataSourceName') in component.get('v.allowedBrokers'))) {
                    component.set('v.item.dataSourceName', component.get('v.allowedBrokers')[0]);
                    component.set('v.item.fieldName', null);
                    component.set('v.item.sample', null);
                }
                break;
            }
            default: {
                component.set('v.item.dataSourceName', null);
                component.set('v.item.fieldName', null);
                component.set('v.item.sample', null);
                break;
            }
        }
        component.set('v.flicker', true);
    },
})