trigger PreventBranchDeletion on Branch__c (before delete) {
//code
Branch__c b = trigger.old[0];
integer totalStudents= [select count() from Student__c where Selected_Branch_Name__c=:b.id];
    if(totalStudents>0){
        b.addError('you cant delete this branch because of students enrolled for it');
    }
//code
}