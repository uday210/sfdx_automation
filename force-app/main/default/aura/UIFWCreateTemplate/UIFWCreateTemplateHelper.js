/**
 * Created by X227209 on 5/28/2019.
 */
({
    createTemplate : function(component, event, helper) {
        var templateName = component.get("v.templateName");
        var params = { templateName : templateName};
        uifwUtil.enqueueServerAction(component,'templateExists', params).then( value=>{
            component.set("v.templateExists", value);
            var templateExists = value;
            // if template not exists then open template builder
            if(!templateExists){
                var eventParams = {
                    "action" : "createNewTemplate",
                    "templateName" : templateName,
                    "templateDesignFile" : {"name":templateName}
                };
                uifwUtil.fireComponentEvent(component, 'createTemplateEvent', eventParams);
            }
        }).catch((err) => {
            var errorHandler = component.find('errorHandler');
            var error = {};
            error.title = "Technical Error: Onload API data issue";
            error.description = err.message;
            errorHandler.displayError(error);
        });
    }
})