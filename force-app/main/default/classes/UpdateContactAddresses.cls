global class UpdateContactAddresses implements 
    Database.Batchable<sObject>, Database.Stateful {
    
    // instance member to retain state across transactions
    static Integer recordsProcessed ;
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(
            'SELECT ID, BillingStreet, BillingCity, BillingState, ' +
            'BillingPostalCode, (SELECT ID, MailingStreet, MailingCity, ' +
            'MailingState, MailingPostalCode FROM Contacts) FROM Account ' 
        );
    }
    global void execute(Database.BatchableContext bc, List<Account> scope){
        // process each batch of records
        List<Contact> contacts = new List<Contact>();
        for (Account account : scope) {
        recordsProcessed = recordsProcessed + 1;
            for (Contact contact : account.contacts) {
                contact.MailingStreet = account.BillingStreet;
                contact.MailingCity = account.BillingCity;
                contact.MailingState = account.BillingState;
                contact.MailingPostalCode = account.BillingPostalCode;
                // add contact to list to be updated
                contacts.add(contact);
                // increment the instance member counter
                
            }
        }
        update contacts;
    }    
    global void finish(Database.BatchableContext bc){
      system.debug('recordsProcessed>>  '+recordsProcessed );
    }    
}