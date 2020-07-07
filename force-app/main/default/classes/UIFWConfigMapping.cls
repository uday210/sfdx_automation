/**
 * Created by x227209 on 7/9/2019.
 */

/** This class has all the JSON mapping for UI Framework */

global without sharing class UIFWConfigMapping {

    public static Map <String, String> templateMapping = new Map <String, String> ();
    static {
        templateMapping.put('E_P_Capability__c', 'enpCapability');
        templateMapping.put('Is_Active__c', 'isActive');
        templateMapping.put('Version_No__c', 'version');
        templateMapping.put('Layouts__c', 'layouts');
        templateMapping.put('Name', 'name');
        templateMapping.put('DataObjects__c', 'dataSources');
    }
    public static Map <String, String> fieldMapping = new Map <String, String> ();
    static {
        fieldMapping.put('UIFW_Id__c', 'dataItemId');
        fieldMapping.put('Name', 'label');
        fieldMapping.put('Component__c', 'component');
        fieldMapping.put('Data_Source_Name__c', 'dataSourceName');
        fieldMapping.put('Data_Source_Type__c', 'dataSourceType');
        fieldMapping.put('Default_Value__c', 'defaultValue');
        fieldMapping.put('Data_Loading_Scheme__c', 'dataLoadingScheme');
        fieldMapping.put('ToolTip_Text__c', 'toopTipText');
        fieldMapping.put('Value_Key__c', 'fieldName');
        fieldMapping.put('Type__c', 'type');
        fieldMapping.put('Definition__c', 'definition');
        fieldMapping.put('Attributes__c', 'attributes');
    }
    public static Map <String, String> apiConfigMapping = new Map <String, String> ();
    static {
        apiConfigMapping.put('Id', 'sfdcId');
        apiConfigMapping.put('API_Name__c', 'name');
        apiConfigMapping.put('Authorization__c', 'authorization');
        apiConfigMapping.put('Endpoint_URL__c', 'baseURL');
        apiConfigMapping.put('Body__c', 'body');
        apiConfigMapping.put('Header_Parameters__c', 'header');
        apiConfigMapping.put('Request_Type__c', 'method');
        apiConfigMapping.put('Named_Credential__c', 'namedCredential');
        apiConfigMapping.put('Query_Parameters__c', 'query');
        apiConfigMapping.put('JSON_Response__c', 'sampleJSONResponse');
        apiConfigMapping.put('Sub_Path__c', 'subPath');
    }
    public static Map <String, String> apiConfigParamsObjMapping = new Map <String, String>();
    static {
        apiConfigParamsObjMapping.put('Description__c','description');
        apiConfigParamsObjMapping.put('Parameter_Type__c','type');
        apiConfigParamsObjMapping.put('Key__c','key');
        apiConfigParamsObjMapping.put('Mapped_URL_Parameter__c','value');
        apiConfigParamsObjMapping.put('Request_Response__c','requestresponse');
    }
}