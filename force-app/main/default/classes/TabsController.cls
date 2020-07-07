public class TabsController {
    
    @AuraEnabled
    public static List<MainTab__mdt> getAllTabs(){
        
      //  SELECT ALLFIELDS, (SELECT ALLFIELDS FROM Children__r ORDER BY Order__c) FROM Parent__mdt
        return [ SELECT Label,Display__c, (SELECT Label,Display__c FROM ChildTabs__r ORDER BY Order__c) from MainTab__mdt order by Order__c ];
    }

}