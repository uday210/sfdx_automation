trigger EventDataUpdate on Event (before update) {

    Event ev = trigger.new[0];
    String invitess = '';
    for(EventRelation each:[SELECT Id, RelationId, EventId FROM EventRelation where EventId=:ev.id]){
        invitess+=each.RelationId+',';
        
    }
    ev.Invitees__c = invitess;
}