/** This class will get and set all the values from different tables of UI framework and create JSON */

global without sharing class UIFWSchema{

    public static List<UIFWTemplate__c> getTemplateRecord(String name){
        name = String.escapeSingleQuotes(name);
        String queryString = 'Select ' + getColumns('UIFWTemplate__c') + ' from UIFWTemplate__c where name =:name';
        return Database.query(queryString);
    }
    public static List<UIFWField__c> getFieldRecords(String templateName){
        templateName = String.escapeSingleQuotes(templateName);
        String defaultFields = ' Template_Name__c, ';
        String queryString = 'Select ' + defaultFields + getColumns('UIFWField__c') + ' from UIFWField__c where Template__r.name =:templateName order by Template__r.name asc';
        return Database.query(queryString);
    }
    public static String getColumns(String objectName){
        String fields = 'createdDate';
        if(objectName == 'UIFWTemplate__c'){
            for(String fieldAPIName: UIFWConfigMapping.templateMapping.keySet()){
                fields = String.isEmpty(fields) ? fieldAPIName : fields + ' , ' + fieldAPIName;
            }
        }
        if(objectName == 'UIFWField__c'){
            for(String fieldAPIName: UIFWConfigMapping.fieldMapping.keySet()){
                fields = String.isEmpty(fields) ? fieldAPIName : fields + ' , ' + fieldAPIName;
            }
        }
        if(objectName == 'Dynamic_Aura_UI_API__c'){
            for(String fieldAPIName: UIFWConfigMapping.apiConfigMapping.keySet()){
                fields = String.isEmpty(fields) ? fieldAPIName : fields + ' , ' + fieldAPIName;
            }
        }
        if(objectName == 'Dynamic_API_Parameter__c'){
            for(String fieldAPIName: UIFWConfigMapping.apiConfigParamsObjMapping.keySet()){
                fields = String.isEmpty(fields) ? fieldAPIName : fields + ' , ' + fieldAPIName;
            }
        }

        return fields;
    }
    public static String getTemplateBackupName(String templateName, Integer index){
        String toBeDeleted =  templateName +'_'+String.valueOf(index)+'_'+ String.valueOf(System.now())+'_delete';
        return toBeDeleted;
    }
    public static void backUpExistingTemplate(String templateName){
        List<UIFWTemplate__c> templateList = [select Id, Name from UIFWTemplate__c where name =:templateName];
        Integer i = 1;
        for(UIFWTemplate__c template : templateList){
            template.is_Active__c=false;
            template.name = getTemplateBackupName(template.name, i);
            i = i+1;
        }
        if(templateList.size()>0){
            try {
                update templateList;
            }catch(Exception e){
               // AuraExceptionBuilder builder = new AuraExceptionBuilder(e);
               // builder.addMessage('Error in UIFWSchema Template backup: ' + e.getMessage()).throwException();
            }
        }
    }
    public static boolean templateExists(String name){
        List<UIFWTemplate__c> templateList = [select Id from UIFWTemplate__c where name =:name];
        if(templateList.size()>0){
            return true;
        }else{
            return false;
        }
    }
    public static Map<String, String> reverseKeyValue(Map<String, String> fieldMapping){
        Map<String, String> reverseMap = new Map<String, String>();
        for(String key: fieldMapping.keySet()){
            reverseMap.put(fieldMapping.get(key), key);
        }
        return reverseMap;
    }
    public static Map<String, String> createAPI(String apiObjectName, String apiObject){
    /***********
        Map<String, String> jsonKeyToFieldAPIMap = reverseKeyValue(UIFWConfigMapping.apiConfigMapping);
        Map<String, String> returnMap = new Map<String, String>();
        Map<String, Object> apiObjectJSON = (Map<String, Object>)JSON.deserializeUntyped(apiObject);
        SObject sObjectAPIRecord = Schema.getGlobalDescribe().get(apiObjectName).newSObject();
        List<Dynamic_API_Parameter__c> paramInsLst = new List<Dynamic_API_Parameter__c>();

        String apiName = (String)apiObjectJSON.get('name');
        List<Dynamic_Aura_UI_API__c> apiList = new List<Dynamic_Aura_UI_API__c>();
        apiList = [Select Id, Name from Dynamic_Aura_UI_API__c where API_Name__c = :apiName];

        if(apiList.size()>1){
            AuraExceptionBuilder builder = new AuraExceptionBuilder();
            builder.addMessage('Error in API Record Creation multiple api exists with same name' ).throwException();
        }else if(apiList.size()==1){
            // if exists then update the existing one
            sObjectAPIRecord.id = apiList[0].id;
        }
        Savepoint sp = Database.setSavepoint();
        try{
            for(String attributeName : apiObjectJSON.keySet()){
                String sObjectField = jsonKeyToFieldAPIMap.get(attributeName);
                Object value = apiObjectJSON.get(attributeName);
                if(sObjectField != null){
                    if(attributeName == 'header'){
                        //TODO: Implement specific body insert method
                        sObjectAPIRecord.put(sObjectField, JSON.serialize(value));
                    }else if(attributeName == 'query'){
                        //TODO: Implement specific body insert method
                        sObjectAPIRecord.put(sObjectField, JSON.serialize(value));
                    }else{
                        //Not an object it's string
                        sObjectAPIRecord.put(sObjectField, value);
                    }
                }
                if(sObjectField == null && attributeName == 'customParameters'){
                    paramInsLst= getAPIParamsRecords(value);
                }
            }
            upsert sObjectAPIRecord;

            delete [select id from Dynamic_API_Parameter__c where Dynamic_Aura_UI_API__c  =:sObjectAPIRecord.id];
            for(Dynamic_API_Parameter__c obj : paramInsLst){
                obj.Dynamic_Aura_UI_API__c = sObjectAPIRecord.id;
            }
            insert paramInsLst;
            returnMap.put('status', 'SUCCESS');
            returnMap.put('message', 'Record Created successfully');
            returnMap.put('data', getAPIConfig(String.valueOf(sObjectAPIRecord.get('API_Name__c'))));
        }catch(Exception e){
            Database.rollback(sp);
            AuraExceptionBuilder builder = new AuraExceptionBuilder(e);
            builder.addMessage('Error in API Record Creation ' + e.getMessage()).throwException();
            returnMap.put('ERROR:', e.getMessage());
        }
        return returnMap;
        ************/
            return null;
    }
/******
    public static  List<Dynamic_API_Parameter__c>  getAPIParamsRecords(object paramJSON){
        Map<String, String> keyToFieldAPIMap = reverseKeyValue(UIFWConfigMapping.apiConfigParamsObjMapping);
        List<Dynamic_API_Parameter__c> insParamLst = new List<Dynamic_API_Parameter__c>();
        List<Object> objLst = (List<Object>) paramJSON;

        for(Object mapObj : objLst ){
            Map<String,Object> paramMap = (Map<String,Object>) mapObj;
            Dynamic_API_Parameter__c param = new Dynamic_API_Parameter__c();
            for(string key :paramMap.keyset()){
                param.put(keyToFieldAPIMap.get(key.toLowerCase()),(String)paramMap.get(key));
            }
            insParamLst.add(param);
        }
        return insParamLst;
    }
*************/
    /***********
    public static List<Dynamic_Aura_UI_API__c> getAPIConfigRecord(String name){
        String queryString = 'Select ' + getColumns('Dynamic_Aura_UI_API__c') + ' from Dynamic_Aura_UI_API__c where API_Name__c =:name';
        return Database.query(queryString);
    }

    public static List<Dynamic_API_Parameter__c> getAPIParamRecords(String name){
        String queryString = 'Select ' + getColumns('Dynamic_API_Parameter__c') + ' from Dynamic_API_Parameter__c where Dynamic_Aura_UI_API__r.API_Name__c =:name';
        return Database.query(queryString);
    }

    public static String getAPIConfig(String apiName){
        return getAPIConfig(apiName,'');
    }
    public static String getAPIConfig(String apiName,String actionType){
        Map<String, Object> apiObject = new Map<String, Object>();
        Dynamic_Aura_UI_API__c apiConfigRec = getAPIConfigRecord(apiName)[0];
        List<Dynamic_API_Parameter__c> paramlst = getAPIParamRecords(apiName);
        for(String fieldAPIName: UIFWConfigMapping.apiConfigMapping.keySet()){
            if(UIFWConfigMapping.apiConfigMapping.containsKey(fieldAPIName)
               && apiConfigRec.get(fieldAPIName) != null) {
                   // This gives JSON key
                   String key = UIFWConfigMapping.apiConfigMapping.get(fieldAPIName);
                   // This give JSON value
                   Object value = apiConfigRec.get(fieldAPIName);
                   if (key != null) {

                       if (key == 'header' || key == 'query') {
                           String exportStr = 'export';
                           if (value != null && actionType.toLowerCase().trim() == exportStr.toLowerCase().trim()) {
                               Object formattedValue = JSON.deserializeUntyped(String.valueOf(value));
                               List<Object> headerJSON = (List<Object>)(formattedValue);
                               List<Object> newHeaderJSON = new List<Object>();
                               for(Object headerNode : headerJSON){
                                   Map<String,Object> node = (Map<String, Object>)headerNode;
                                   if(node.get('key').toString().toLowerCase().trim() != 'authorization'){
                                       newHeaderJSON.add(headerNode);
                                   }
                               }
                               apiObject.put(key, newHeaderJSON);
                           }else if(value != null ){
                               Object formattedValue = JSON.deserializeUntyped(String.valueOf(value));
                               List<Object> headerJSON = (List<Object>)(formattedValue);
                               apiObject.put(key, headerJSON);
                           } else {
                               apiObject.put(key, '');
                           }
                       } else {
                           if(actionType.toLowerCase().trim() == 'export' && key.toLowerCase().trim() != 'authorization'){
                               apiObject.put(key, value);
                           }else{
                               apiObject.put(key, value);
                           }
                       }
                   }
               }
        }
        if (!paramlst.isEmpty()){
            List<Map<String,String>> paramList = new List<Map<String,String>>();
            Map<String,String> paramMap;
            Map<String, String> fieldAPIMaptoKey = UIFWConfigMapping.apiConfigParamsObjMapping;
            for(Dynamic_API_Parameter__c param : paramlst){
                paramMap = new Map<String,String>();
                for(string fl : fieldAPIMaptoKey.keySet()){
                    paramMap.put(fieldAPIMaptoKey.get(fl),(string)param.get(fl));
                }
                paramList.add(paramMap);
            }
            apiObject.put('customParameters', paramList);
        }
        return JSON.serializePretty(apiObject);
    }
    public static UIFWTemplate__c createTemplateHeader(Map<String, Object> templateJSON){
        UIFWTemplate__c templateRec = new UIFWTemplate__c();
        Map<String, String> jsonKeyToFieldAPIMap = reverseKeyValue(UIFWConfigMapping.templateMapping);
        for(String jsonField : templateJSON.keySet()){
            // Insert header level information
            Object fieldValue = templateJSON.get(jsonField);
            if(jsonField != 'layouts'
                    && jsonField != 'dataItems'
                    && jsonField != 'dataSources') {
                templateRec.put(jsonKeyToFieldAPIMap.get(jsonField), fieldValue);
            }
        }
        //Insert layout
        if(templateJSON.containsKey('layouts')){
            templateRec.put('Layouts__c', JSON.serialize(templateJSON.get('layouts')));
        }
        if(templateJSON.containsKey('dataSources')){
            templateRec.put('DataObjects__c', JSON.serialize(templateJSON.get('dataSources')));
        }
        try{
            templateRec.Is_Active__c=true;
            Insert templateRec;
        }catch(Exception e){
            // Throw exception so we can rollback all transactions
            AuraExceptionBuilder builder = new AuraExceptionBuilder(e);
            builder.addMessage('Error in UIFWSchema.createTemplateHeader' + e.getMessage()).throwException();
        }
        return templateRec;
    }
    public static void createFields(Id templateId, Map<String, Object> templateJSON){
        Map<String, String> jsonKeyToFieldAPIMap = reverseKeyValue(UIFWConfigMapping.fieldMapping);
        List<UIFWField__c> fieldRecordList = new  List<UIFWField__c>();
        List<Object> fieldList = (List<Object>)templateJSON.get('dataItems');
        for(Object field : fieldList){
            Map<String, Object> fieldMap = new Map<String, Object>();
            fieldMap = (Map<String, Object>)field;
            UIFWField__c fieldRec = new UIFWField__c();
            // Add template id
            fieldRec.Template__c = templateId;
            //Iterate over each attributes and assigns value from json
            for(String attributeName : fieldMap.keySet()){
                String sObjectField = jsonKeyToFieldAPIMap.get(attributeName);
                Object value = fieldMap.get(attributeName);
                if(sObjectField != null
                        && attributeName != 'templateExternalId' ){
                    fieldRec.put(sObjectField, value);
                }
            }
            fieldRecordList.add(fieldRec);
        }
        try{
            Insert fieldRecordList;
        }catch(Exception e){
            AuraExceptionBuilder builder = new AuraExceptionBuilder(e);
            builder.addMessage('Error in UIFWSchema field creation' + e.getMessage()).throwException();
        }
    }
    // Create template
    public static Map<String, String> createTemplate(String templateJSONFile){
        Map<String, String> returnResult = new Map<String, String>();
        Map<String, Object> templateJSON = (Map<String, Object>)JSON.deserializeUntyped(templateJSONFile);
        Savepoint sp = Database.setSavepoint();
        try{

            // Backup existing template if any
            backUpExistingTemplate(String.valueOf(templateJSON.get('name')));
            System.debug('after backup');
            //Create template header
            UIFWTemplate__c template = createTemplateHeader(templateJSON);
            System.debug('after header');
            //Create fields
            createFields(template.Id, templateJSON);
            System.debug('after fields');
            returnResult.put('SUCCESS:', 'Template Created Successfully');
        }catch(Exception e){
            Database.rollback(sp);
            AuraExceptionBuilder builder = new AuraExceptionBuilder(e);
            builder.addMessage('Error in UIFWSchema Template creation: ' + e.getMessage()).throwException();
            returnResult.put('ERROR:', e.getMessage());
        }
        return returnResult;
    }
    public static Map<String, Object> getTemplateHeader(UIFWTemplate__c template){
        Map<String, Object> templateNode = new  Map<String, Object>();
        for(String fieldAPIName: UIFWConfigMapping.templateMapping.keySet()){
            if(UIFWConfigMapping.templateMapping.containsKey(fieldAPIName)
                    && template.get(fieldAPIName) != null
                    && !fieldAPIName.equalsIgnoreCase('layouts')
                    && !fieldAPIName.equalsIgnoreCase('dataItems')
                    && !fieldAPIName.equalsIgnoreCase('dataSources')){
                String key = UIFWConfigMapping.templateMapping.get(fieldAPIName);
                Object value = template.get(fieldAPIName);
                templateNode.put(key, value);
            }
        }
        return templateNode;
    }

    public static Object getTemplateLayout(UIFWTemplate__c template, String type){
        // TODO: layout type logic will be added later once mobile layout considered
        Object layoutNode = new  Map<String, Object>();
        if(template.layouts__c!=null) {
            layoutNode = JSON.deserializeUntyped(template.layouts__c);
        }
        return layoutNode;
    }

    public static Object getTemplateDataObjects(UIFWTemplate__c template){
        // TODO: layout type logic will be added later once mobile layout considered
        Object dataObjectsNode = new  Map<String, Object>();
        if(template.DataObjects__c!=null) {
            dataObjectsNode = JSON.deserializeUntyped(template.DataObjects__c);
        }else{
            dataObjectsNode = JSON.deserializeUntyped('[]');
        }
        return dataObjectsNode;
    }

    public static List<Map<String, Object>> getFields(UIFWTemplate__c template){
        List<Map<String, Object>> fieldListJSON = new List<Map<String, Object>>();
        List<UIFWField__c> fieldList = getFieldRecords(template.Name);
        for(UIFWField__c fieldRec: fieldList){
            Map<String, Object> fieldNode = new  Map<String, Object>();
            for(String fieldAPIName: UIFWConfigMapping.fieldMapping.keySet()){
                if(UIFWConfigMapping.fieldMapping.containsKey(fieldAPIName)
                        && fieldRec.get(fieldAPIName) != null){
                    String key = UIFWConfigMapping.fieldMapping.get(fieldAPIName);
                    Object value = fieldRec.get(fieldAPIName);
                    fieldNode.put(key, value);
                }
            }
            fieldListJSON.add(fieldNode);
        }
        return fieldListJSON;
    }

    public static String getTemplate(String templateName){
        List<UIFWTemplate__c> templateList = getTemplateRecord(templateName);
        if(templateList.size()>0) {
            Map<String, Object> template = getTemplateHeader(templateList[0]);
            Object layouts = getTemplateLayout(templateList[0], null);
            Object dataObject = getTemplateDataObjects(templateList[0]);
            List<Map<String, Object>> fields = getFields(templateList[0]);
            //Construct JSON file for ui
            //Add layouts.
            template.put('layouts', layouts);
            //Add data items to fields
            template.put('dataItems', fields);
            //Add all data source from data objects
            template.put('dataSources', dataObject);

            return JSON.serialize(template);
        }else{
            return null;
        }
    }
    public static Map<String, String> deleteTemplate(String name){
        Map<String, String> returnResult = new Map<String, String>();
        List<UIFWTemplate__c> templateList = [select Id from UIFWTemplate__c where name =:name];
        if(templateList.size()>0){
            List<UIFWField__c> fldList = [select id,name from UIFWField__c where Template__c IN :templateList];
            try {
                delete fldList;
                delete templateList;
                returnResult.put('SUCCESS:', 'Template deleted Successfully');
            }catch(Exception e){
                AuraExceptionBuilder builder = new AuraExceptionBuilder(e);
                returnResult.put('ERROR:', e.getMessage());
                builder.addMessage('Error in UIFWSchema template deletion: ' + e.getMessage()).throwException();
            }
        }
        return returnResult;
    }
    @AuraEnabled
    public static String getNamedCredentialURL(String developerName){
        for(NamedCredential namedCredentialObject : [SELECT DeveloperName, EndPoint FROM NamedCredential where DeveloperName=:developerName]){
            if(!Test.isRunningTest()){
                return namedCredentialObject.EndPoint;
            }
        }
        return null;
    }
***************/
}