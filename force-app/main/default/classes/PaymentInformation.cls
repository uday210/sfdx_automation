global with sharing class PaymentInformation{
    webservice static list<Payment__c> getPaymetInformationData() {
        
        
        return [select Account_Number__c,Amount__c,Paid_On__c from Payment__c];
    }
}