trigger PopulateStudentCount on Student__c (after insert,after delete) {
     Student__c s = new Student__c();
    if(trigger.isInsert){    
    	s = trigger.new[0];
    }
    if(trigger.isDelete){
        s = trigger.old[0];
    }
    Integer CountOfStudents = [select count() from Student__c where Selected_Branch_Name__c=:s.Selected_Branch_Name__c];
    system.debug('students count  '+CountOfStudents);
    
    Branch__c b = [select id,Number_Of_Students__c from Branch__c where id=:s.Selected_Branch_Name__c];
    b.Number_Of_Students__c = CountOfStudents;
    update b;

}