({
    doComponentCreator : function(cmp,event,helper,cmpData,cmposition){
  console.log('cmpData>>>>>> cmpData ',cmpData);
        //cmpName,objName,fieldsSetIs,otherInfo) {
        $A.createComponents(cmpData,
            function(components, status, errorMessage){
                if (status === "SUCCESS") {
                    var body = cmp.get("v.body");
                    body.push(components);
                    cmp.set("v.body", body);
               //     alert('cmposition '+cmposition);
               console.log('cmp.find("grid").find(cmposition) ',cmp.find("grid").find(cmposition));
                    cmp.find("grid").find(cmposition).set("v.body", components);
                    if(cmp.get('v.isFromDesigner')){
                        alert('sort');
             helper.customSort(cmp,event,helper,cmposition);
                        /*    $("#"+cmposition).sortable({
                        stop: function(event, ui) {
                            var elePosMap = {};
                           console.log('>>>> ui ', $(this).find('.draggablesection'));
                            $.each($(this).find('.draggablesection'), function( index, value ) {
                            console.log( index , ": " , value.id );
                                elePosMap[value.id] =index;
                        });
        console.log('>> ele map is ',JSON.stringify(elePosMap));
                            helper.helperreArrageElements(cmp,event,helper,JSON.stringify(elePosMap));
       // console.log('>>>> ui ',ui);
        //alert("New position: " + ui.item.index());
    }
});*/
   			// $("#"+cmposition).disableSelection();
                    }
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                    // Show offline error
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
            }
        );
    },
    helperDoinit:function(cmp,event,helper){
        //alert('helperDoinit');
      //  alert(cmp.get("v.templateName"));
        if(cmp.get("v.templateName")){
         var action = cmp.get("c.getUiDetails");
        action.setParams({ uiElementName : cmp.get("v.templateName") });

        action.setCallback(this, function(response) {
            var state = response.getState();
       //     alert(state);
            if (state === "SUCCESS") {
              
                console.log("From server: Component_Position__c " , response.getReturnValue());
                var elements = response.getReturnValue().Dynamic_UI_Elements__r;
               
                if(response.getReturnValue() && elements){
                    var cmpData = {};
            
                for(var i=0;i<elements.length;i++){ 
                var configData = JSON.parse(elements[i].Config_Data__c);
                console.log('configData ',configData);
                var fieldsSet =[];
                    if(configData.fields){
                    fieldsSet = configData.fields.split(',');
                    }   
                    var eachCmp = [elements[i].Component_Name__c,{"sObjecNameIs": configData.ObjectName,"fieldList":fieldsSet,"otherData":configData,"componentDetails":elements[i].Id,"renderedEleId":elements[i].Id,"isDesigner":cmp.get('v.isFromDesigner')}];
                    if(!cmpData[elements[i].Component_Position__c]){
                    var eachCmpList = [];
                    eachCmpList.push(eachCmp);
                    cmpData[elements[i].Component_Position__c]= eachCmpList;
                    }else{
                           var eachCmpList = cmpData[elements[i].Component_Position__c];
                    eachCmpList.push(eachCmp);
                    cmpData[elements[i].Component_Position__c]= eachCmpList;
                    //    cmpData["isDesigner"]=cmp.get('v.isFromDesigner');
                 
                    }
                    
                }
                console.log('cmpData ',cmpData);
                   
              //  if(elements.Component_Name__c =='c:DynamicFormCreator'){
                    for(var key in cmpData){
                   //    alert(key);
                    	helper.doComponentCreator(cmp,event,helper,cmpData[key],key);//elements.Component_Name__c,configData.ObjectName,fieldsSet,configData);
                    }
                        // }else if(elements.Component_Name__c=='c:DynamicTableCreator'){
                    
                }
            }
            
        });

        $A.enqueueAction(action);
       
        }
    },
      helperreArrageElements:function(cmp,event,helper,data){
     //alert('in re arranging');
         var action = cmp.get("c.reArrangeElements");
        action.setParams({ elementJson : data});

        action.setCallback(this, function(response) {
            var state = response.getState();
           // alert(state);
            if (state === "SUCCESS") {
               
              
            }
            
        });

        $A.enqueueAction(action);
       
      },
    customSort:function(cmp,event,helper,loc){
      

new Sortable(loc, {
	group: "words",
	handle: ".my-handle", // Restricts sort start click/touch to the specified element
	draggable: ".item",   // Specifies which items inside the element should be sortable
	ghostClass: "sortable-ghost",
	onAdd: function (evt){
        var itemEl = evt.item;
    },

    onUpdate: function (evt){
        var itemEl = evt.item; // the current dragged HTMLElement
    },

    onRemove: function (evt){
        var itemEl = evt.item;
    }
});
    }
   

})