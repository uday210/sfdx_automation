global with sharing class PaymentData{
    webservice static list<paymentInfo> getPaymetInformationData() {
        
        list<paymentInfo> Data = new list<paymentInfo>();
        
        for(Payment__c eachPayment: [select Account_Number__c,Amount__c,Paid_On__c from Payment__c]){
            Data.add(new paymentInfo(eachPayment.Account_Number__c,eachPayment.Amount__c,eachPayment.Paid_On__c ));
        }
        
        return Data;
    }
    
    
    
    global class paymentInfo{
    
        webservice string  Account_Number{get;set;}
        webservice Decimal Amount{get;set;}

        webservice Date Paid_On{get;set;}

        
        paymentInfo(string  Account_Number,Decimal Amount,Date Paid_On){
            this.Account_Number=  Account_Number;
            this.Amount = Amount;
            this.Paid_On = Paid_On;
        
        }
        
    }
}