/**
 * Created by X227209 on 5/28/2019.
 */
({
    initialize : function(component, event, helper) {
    },
    uifwJSLibraryLoaded : function(component, event, helper) {
    },
    createTemplate : function(component, event, helper) {
        //Explicitly checking the custom validation:
        var template = component.find('templateId');
        var templateName = template.get("v.value");
        var templateRegexFormat = '^[a-zA-Z0-9_ ]*$';
        //Check for regular expression match with the field value
        if(templateName==null || templateName==='' || (templateName!=null && !templateName.match(templateRegexFormat))) {
            //set the custom error message
            template.setCustomValidity("No special characters allowed");
        }else{
            //reset the error message
            template.setCustomValidity("");
            helper.createTemplate(component, event, helper);
        }
    },
    closeModal : function(component, event, helper) {
        uifwUtil.fireComponentEvent(component, 'createTemplateEvent', {"action" : "cancelEdit"});
    },

})