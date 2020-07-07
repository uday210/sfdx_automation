({
    
    doInit : function(cmp) {
        $A.createComponent(
            "c:mydemoCmp",
            {
              
               
            },
            function(newButton, status, errorMessage){
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    var body = cmp.get("v.body");
                    body.push(newButton);
                    cmp.set("v.body", body);
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

    handlePress : function(cmp) {
        // Find the button by the aura:id value
        console.log("button: " + cmp.find("findableAuraId"));
        console.log("button pressed");
    }
})