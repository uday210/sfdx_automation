public class syncFilesCtrl {

    
    @AuraEnabled
    public static void syncFiles(String eventIdIs){
        event ev = [select whatId from event where id=:eventIdIs];
        list<ContentDocumentLink> ALLnew = new list<ContentDocumentLink>();
        
        for(ContentDocumentLink eachCV:[SELECT LinkedEntityId, ContentDocumentId, Id FROM ContentDocumentLink where LinkedEntityId=:eventIdIs ]){
            
            ContentDocumentLink cv = new ContentDocumentLink();
            cv.ContentDocumentId = eachCv.ContentDocumentId;
            cv.LinkedEntityId = ev.whatId;
            cv.ShareType = 'I';
            ALLnew.add(cv);
        }
        
        database.insert(ALLnew,false);
    }
}