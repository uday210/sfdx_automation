public class DemoPromises {
    
    
    @AuraEnabled
    public static string demo1(){
        try{
        } catch (Exception e) {

        // "Convert" the exception into an AuraHandledException

        throw new AuraHandledException('Darn it! Something went wrong: '

           + e.getMessage());   

   }

        return 'This si from demo 1';
    } 
    
    @AuraEnabled
    public static string demo2(){
        
        return 'This si from demo 2';
    } 
    
    @AuraEnabled
    public static string demo3(){
        
        return 'This si from demo 3';
    } 
    
    @AuraEnabled
    public static list<Account> demo4(){
        
        return [select id,name from Account];
    } 

}