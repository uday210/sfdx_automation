public class getContacts{


    @AuraEnabled
    public static list<Contact> getContacts(){
    
        return [select id from Contact];
            }
}