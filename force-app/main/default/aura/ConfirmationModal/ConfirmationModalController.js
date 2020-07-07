/**
 * Created by x210643 on 5/17/18.
 */
({

    show: function(component, event, helper) {
        $A.util.addClass(component.find("modal"), "slds-fade-in-open");
        $A.util.addClass(component.find("modal-backdrop"), "slds-backdrop--open");
        if(!component.get('v.function')){
            let promise = component.find('promiseHelper').createExternalPromise();
            component.set('v.promise', promise);
            return promise;
        }

    },

    hide: function(component, event, helper) {
        $A.util.removeClass(component.find("modal"), "slds-fade-in-open");
        $A.util.removeClass(component.find("modal-backdrop"), "slds-backdrop--open");
        component.set('v.running', false);
        let promise = component.get('v.promise');
        if(promise){
            promise.reject();
        }
    },

    runFunction: function(component, event, helper) {
        let promise = component.get('v.promise');
        if(promise){
            $A.util.removeClass(component.find("modal"), "slds-fade-in-open");
            $A.util.removeClass(component.find("modal-backdrop"), "slds-backdrop--open");
            return promise.resolve();
        }
        var func = component.get('v.function');
        component.set('v.bind', component.get('v.param'));
        component.set('v.running', true);
        $A.enqueueAction(func);

    },

})