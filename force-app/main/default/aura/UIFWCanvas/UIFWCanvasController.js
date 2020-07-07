({
	uifwJSLibraryLoaded : function(component, event, helper) {
        component.set("v.scriptLoaded", true);
	},
    openTemplateBuilder : function(component, event, helper){
        component.set("v.showTemplateBuilder", true);
    },
    gotoHome: function(component, event, helper){
        component.set("v.showTemplateBuilder", false);
    },
    createNewTemplate: function(component, event, helper){
        $A.createComponent("c:UIFWCreateTemplate",
            { createTemplateEvent : component.getReference('c.handleTemplateEvent')},
            function(content, status) {
                if (status === "SUCCESS") {
                    var modalPromise = component.find('overlayLib').showCustomModal({
                        header: "New Template",
                        body: content,
                        showCloseButton: true,
                        cssClass: "myModal",
                        closeCallback: function() {
                        }
                    });
                    component.set("v.modalPromise", modalPromise);
                }
            });
    },
	handleTemplateEvent : function(component, event, helper) {
        let closeModal = false;
        let action = event.getParam("action");
        let templateName = event.getParam("templateName");
        let templateDesignFile = event.getParam("templateDesignFile");
        if(action === 'cancelEdit'){
            // TODO: add cancel post processing steps here
            closeModal = true;
        }
        if(action === 'createNewTemplate'){
            component.set('v.showTemplateBuilder', false);
            component.set("v.templateDesignFile", {name:templateName});
            component.set("v.showTemplateBuilder", true);
            closeModal = true;
        }
        if(action === 'editTemplate'){
            component.set('v.showTemplateBuilder', false);
            // TODO: add edit template processing steps here
            // Set template design file
            component.set("v.templateDesignFile", templateDesignFile);
            //Enable template builder
            component.set("v.showTemplateBuilder", true);            
            closeModal = true;
        }
        if(closeModal){
            let modalPromise = component.get('v.modalPromise');
            if (modalPromise) {
                component.get('v.modalPromise').then(function (modal) {
                    modal.close();
                });
            }
            event.stopPropagation();
        }
	}
    
})