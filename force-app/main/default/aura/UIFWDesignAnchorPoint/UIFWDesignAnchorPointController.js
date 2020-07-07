/**
 * Created by x213555 on 7/9/19.
 */
({
    defaultTemplate: function template(component, event, helper) {
        return (type, category) => {
            switch(type) {
                case 'Card':
                case 'section':
                case 'tabContent': {
                    return {
                        name: '',
                        type: category ? category : type,
                        subtype: category ? type : undefined,
                        items: [
                            {
                                type: 'pane',
                                items: [],
                            }
                        ],
                        _targeted: component.get('v.defaultTargeted') ? 1 : 0,
                    }
                }
                default: {
                    return {
                        name: '',
                        type: category ? category : type,
                        subtype: category ? type : undefined,
                        items: [],
                        _targeted: component.get('v.defaultTargeted') ? 1 : 0,
                    }
                }
            }
        };
    },
    cancel: function cancel(component, event, helper) {
        event.preventDefault();
    },
    addItem: function addItem(component, event, helper) {
        let items = component.get('v.items') || [];
        const index = component.get('v.index');
        const type = typeof event.getParam === 'function'
            ? event.getParam('arguments').type
            : event.dataTransfer.getData('draggedItemName');
        let category = typeof event.getParam === 'function'
            ? event.getParam('arguments').section
            : event.dataTransfer.getData('draggedItemSection');
        //salesforce is returning string literal undefined here
        if (category === 'undefined') {
            category = undefined;
        }

        return component.find('promiseHelper').call({
            callingComp: component,
            functionName: 'templateFunction',
            isAura: true,
            fromVariable: true,
        }).then($A.getCallback((templateFunction)=>{
            //clear known targets
            component.find('targetHelper').clearTargets();
            if (index===null||index===undefined) {
                items.push(templateFunction(type, category));
            } else {
                items[index]=templateFunction(type, category);
            }
            component.set('v.items', items);
            if(component.get('v.fireRefresh')) {
                let refreshParentEvent = component.getEvent("refresh");
                refreshParentEvent.fire();
            }
            component.set('globalStorage.uifwForceSidebarRecalc', true);
            component.set('globalStorage.uifwForceSidebarRecalc', false);
            component.set('globalStorage.showUIFWDesignAttributeEditor', true);
            return items;
        })).catch($A.getCallback((error)=>{
            component.get('errorHandler.displayError').execute({
                title: 'Error Adding Item',
                description: error
            });
        })).finally($A.getCallback(()=>{
            if (component.get('v.onDrop')) {
                component.set('v.bind', component.get('v.param'));
                return component.find('promiseHelper').call({
                    callingComp: component,
                    functionName: 'onDrop',
                    isAura: true,
                    fromVariable: true,
                }).catch($A.getCallback((error)=>{
                    component.get('errorHandler.displayError').execute({
                        title: 'Error in onDrop Callback',
                        description: error,
                    });
                }));
            }
        }));
    },
    getJSON: function getJSON(component, event, helper) {
        const type = typeof event.getParam === 'function'
            ? event.getParam('arguments').type
            : event.dataTransfer.getData('draggedItemName');
        let category = typeof event.getParam === 'function'
            ? event.getParam('arguments').section
            : event.dataTransfer.getData('draggedItemSection');
        //salesforce is returning string literal undefined here
        if (category === 'undefined') {
            category = undefined;
        }
        return component.find('promiseHelper').call({
            callingComp: component,
            functionName: 'templateFunction',
            isAura: true,
            fromVariable: true,
        }).then($A.getCallback((templateFunction)=>{
            return templateFunction(type, category);
        })).catch($A.getCallback((error)=>{
            component.get('errorHandler.displayError').execute({
                title: 'Error Getting JSON for Item',
                description: error
            });
        }));
    },
})