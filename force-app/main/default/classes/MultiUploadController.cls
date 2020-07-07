public class MultiUploadController{



    @Remoteaction
    public static String getContentVersionDetails(String cdId){
    
    blob b = [select id,versiondata from ContentVersion where ContentDocumentId=:cdId].VersionData;
    
        return EncodingUtil.base64Encode(b) ;
    } 
}