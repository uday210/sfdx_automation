/**
 * Created by X227209 on 4/24/2019.
 */

public without sharing class UIFWDataServiceController {
    @AuraEnabled
    public static Map<String, String> createAPIConfig(String apiObjectName, String apiObject){
        return UIFWSchema.createAPI(apiObjectName, apiObject);
    }
    /******************
    @AuraEnabled
    public static String getAPIConfig(String apiName){
        return UIFWSchema.getAPIConfig(apiName);
    }
    @AuraEnabled
    public static String getAPIDataX(String apiName, String requestParameters, String contextObject){
        // request parameters could be URL or direct pass thru e.g. {"policyNumber" : "LX1234"}
        return UIFWDataProvider.getAPIData(apiName, requestParameters, contextObject);
    }
    @AuraEnabled
    public static String getTemplateMetaData(String templateName){
        return UIFWSchema.getTemplate(templateName);
    }
    @AuraEnabled
    public static Map<String, String> createTemplate(String designFileJSON){
        return UIFWSchema.createTemplate(designFileJSON);
    }
    @AuraEnabled
    public static boolean templateExists(String templateName){
        return UIFWSchema.templateExists(templateName);
    }
    @AuraEnabled
    public static Map<String, String> exportTemplate(String templateName){
        return UIFWDeploymentUtil.exportTemplate(templateName);
    }
    @AuraEnabled
    public static Map<String, String> deleteTemplate(String templateName){
        return UIFWSchema.deleteTemplate(templateName);
    }
    @AuraEnabled
    public static String getNamedCredentialURL(String developerName){
        return UIFWSchema.getNamedCredentialURL(developerName);  
    }
    ***********/
}