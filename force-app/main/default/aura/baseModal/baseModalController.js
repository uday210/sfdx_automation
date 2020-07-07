/**
 * Created by x213555 on 5/16/19.
 */
({
    init: function (component, event, helper) {
        if(!component.get('v.values')){
            component.set('v.values', {});
        }

        let callingComp = component.get('v.callingComp');
        if(callingComp) {
            callingComp.addValueProvider(
                'modal',
                {
                    get: function (key) {
                        //if we defined a function with this name in the helper, return it
                        if (helper[key]) {
                            return helper[key](component, component.get('v.callingComp'));
                        };
                        return component.get('v.values')[key];
                    },
                    set: function (key, value) {
                        let values = component.get('v.values');
                        values[key]=value;
                        component.set('v.values', values);
                    }
                }
            );
        }
    },
    hideModal: function(component, event, helper) {
        component.get('v.callingComp').get('modal.close').execute();
    }
})