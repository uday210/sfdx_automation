global class BulkImageUploader{

    global String ContentVersionData {get;set;}

    global BulkImageUploader(){
        ContentVersionData  = '';
        String verId = ApexPages.currentPage().getparameters().get('Id');
        ContentVersion cv = [select Id,versiondata from ContentVersion where Id=:verId];
        ContentVersionData  =  EncodingUtil.base64Encode(cv.versionData);
    }

    @AuraEnabled
    Public static String getVersionId(String CDId){
    
        return [select Id,versiondata from ContentVersion where ContentDocumentId=:CDId].Id;
     }
    
     @AuraEnabled
    Public static void deleteVersionId(String CDId){
    
        delete( [select Id from ContentDocument where Id=:CDId]);
     }
     
   //   @AuraEnabled
   //   @RemoteAction
   // Public static string getVersionString(String CDId){
    
     //   ContentVersion cv = [select Id,versiondata from ContentVersion where Id=:CDId];
        
       // return EncodingUtil.base64Encode(cv.versionData);
    // }
    
    
   @AuraEnabled
   @RemoteAction
  global static void setVersionString(String CDId,String versionDataIs){
    
       ContentVersion cv = [select Id,versiondata from ContentVersion where Id=:CDId];
       Blob b = EncodingUtil.base64Decode(versionDataIs);
       cv.versiondata = b;//Blob.valueOf(versionDataIs);
       
       update cv;
        
        //return EncodingUtil.base64Encode(cv.versionData);
     }
}