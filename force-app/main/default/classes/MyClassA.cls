public class MyClassA{

        
       
        
        @AuraEnabled(cacheable=true)
        public static string greet(String name){
            return 'HELLO '+name;
        }
}