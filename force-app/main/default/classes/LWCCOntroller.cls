public class LWCCOntroller{

    @AuraEnabled
    public static list<Account> hetAccData(){
    
    
        return [select Name from Account limit 10];
    }
}