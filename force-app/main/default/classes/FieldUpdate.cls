public class FieldUpdate implements journeyBase{

    public string doRun(String sObjectId,String sObjectName,String configMatrixId){
        String soqlQuery = 'select id from '+sObjectName+' Where id=\''+sObjectId+'\'';
        sObject sObjectData = database.query(soqlQuery);
        FormJourneyConfig__c FJC = [ select id,Config_Data__c from FormJourneyConfig__c where id=:configMatrixId limit 1];
       list<Object> ConfigJsonArray = ( list<Object>)JSON.deserializeUntyped(FJC.Config_Data__c);
        system.debug('Hello world');
        system.debug('ConfigJsonArray size #: '+ConfigJsonArray.size());
        system.debug('ConfigJsonArray elements #: '+ConfigJsonArray);
        map<String,String> FieldsToUpdateAndValue = new map<String,String>();
        for(object eachArrayItem :ConfigJsonArray ){
            map<String,Object> eachItem = (map<String,Object>)eachArrayItem;
             system.debug('ConfigJsonArray each element #: '+eachItem);
            FieldsToUpdateAndValue.put(String.valueOf(eachItem.get('FieldToUpdate')),String.valueOf(eachItem.get('value')));
        }
        
        for(String eachField : FieldsToUpdateAndValue.keyset()){
            
            //FieldsToUpdateAndValue
            sObjectData.put(eachField,FieldsToUpdateAndValue.get(eachField));
        }
        update sObjectData;
        return '';
    }
}