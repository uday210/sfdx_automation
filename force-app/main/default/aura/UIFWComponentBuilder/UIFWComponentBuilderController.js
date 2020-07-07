/**
 * Created by x213555 on 5/15/19.
 */
({
    closeSidebar: function closeSidebar(component, event, handler) {
        component.find('targetHelper').clearTargets();
        component.find('targetHelper').closeSidebar();
    },
    onInit: function onInit(component, event, handler) {
        let componentJSON = component.get('v.componentJSON')||{};
        component.set('v.componentJSON', componentJSON);
    },
    save: function save(component, event, helper) {
        return new Promise($A.getCallback((resolve, reject)=>{
            let result = component.find('promiseHelper').call({
                callingComp: component,
                functionName: 'createTemplate',
                params: {
                    designFileJSON: helper.prepareForSave(JSON.parse(JSON.stringify(component.get('v.componentJSON'))))
                },
                isBackground: true,
            });
            resolve(result);
        })).then($A.getCallback(()=>{
            let toast = $A.get("e.force:showToast");
            toast.setParams({
                "title": 'Template Saved Successfully',
                "message": 'The template has been successfully saved to the sandbox.',
                "type": "success"
            });
            toast.fire();
        })).catch($A.getCallback((error)=>{
            component.get('errorHandler.displayError').execute({
                title: 'Error Saving Template',
                description: error
            });
        }));
    },
    export: function(component, event, helper) {
        var template =  component.get('v.componentJSON');
        return component.find('promiseHelper').call({
            callingComp: component,
            functionName: 'exportTemplate',
            params: {
                templateName: template.name
            }
        }).then((value)=>{
            let toast = $A.get("e.force:showToast");
            toast.setParams({
                "title": 'Template '+template.name+' exported successfully',
                "message": value.message,
                "type": "success"
            });
            toast.fire();
        }).catch((error)=>{
            component.get('errorHandler.displayError').execute({
                title: 'Error in exporting template',
                description: error
            });
        });
    },
    delete : function(component, event, helper) {
        let templateName = component.get('v.componentJSON').name;
        return component.find('promiseHelper').call({
            callingComp: component,
            functionName: 'deleteTemplate',
            params: {
                templateName: templateName
            }
        }).then((value)=>{
            component.find('confirmation').hide();
            let toast = $A.get("e.force:showToast");
            toast.setParams({
                "title": 'Template '+templateName+' has deleted successfully',
                "message": value.message,
                "type": "success"
            });
            toast.fire();
            //Hide the template builder and go back to home page
            component.set('v.showTemplateBuilder',false);
        }).catch((error)=>{
                    component.get('errorHandler.displayError').execute({
                        title: 'Error in deleting template',
                        description: error });
        });
    },
    openDeleteModal: function(component, event, helper) {
        component.find('confirmation').show();
    },
})