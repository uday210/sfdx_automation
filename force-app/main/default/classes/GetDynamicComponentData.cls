public class GetDynamicComponentData {
    
      @AuraEnabled
    public static void reArrangeElements(String elementJson){
        Map<String, String> elements = (Map<String,String>) JSON.deserialize(elementJson, Map<String,String>.class);
       list<Dynamic_UI_Elements__c> AllElements = new list<Dynamic_UI_Elements__c>();
        for(String eachEleId:elements.keyset()){
            
            Dynamic_UI_Elements__c uiElement = new Dynamic_UI_Elements__c();
            uiElement.id = eachEleId;
            uiElement.Order__c = Integer.valueOf(elements.get(eachEleId));
            AllElements.add(uiElement);
        }
        
        update AllElements;
    }
    @AuraEnabled
    public static Dynamic_UI__c getUiDetails(String uiElementName){
        
        return [select id,Grid_Structure__c,(select id,Component_Name__c,Config_Data__c,Component_Position__c,Order__c from Dynamic_UI_Elements__r order by Order__c ASC) from Dynamic_UI__c where name=:uiElementName];
    }
    
     @AuraEnabled
    public static Dynamic_UI_Elements__c getSingleUiDetailsforHtml(){
        
        return [select id,Config_Data__c from Dynamic_UI_Elements__c where id='a056F00000pAM1R'];
    }

}