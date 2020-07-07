/**
 * Created by x213555 on 5/16/19.
 */
({
    //any function defined in the helper can be accessed by the callingComp as component.get('modal.functionName').execute();
    open: function(component, callingComp){
        return {
            execute: function () {
                let func=component.get('v.onOpen');
                if (func) {
                    $A.enqueueAction(func);
                }
                component.set('v.isOpen', true);
                callingComp.set('modal.isOpen', true);
            }
        }
    },
    close: function(component, callingComp){
        return {
            execute: function () {
                component.set('v.isOpen', false);
                callingComp.set('modal.isOpen', false);
                let func=component.get('v.onClose');
                if (func) {
                    $A.enqueueAction(func);
                }
            }
        }
    }
})