public class GetComponentMetadata {
    
    @AuraEnabled
    public static list<SourceCode__mdt> getCmps(){
        
        return [select masterlabel,code__c from SourceCode__mdt];
    }

}