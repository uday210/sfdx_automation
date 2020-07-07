public with sharing class ApexErrorHandler {
    @AuraEnabled
    public static String splunkLogError(String component, String description, String environment, String title, String stackTrace, String callouts) {
      /************8
        String userRole = UserUtil.getLoggedInUser().userRole.name;
        String userProfile = UserUtil.getLoggedInUserProfile();
        Error__c e=new Error__c();
        e.Component__c=component;
        e.Description__c=description.length()>=255?description.substring(0,255):description;
        e.Environment__c=environment;
        e.User_Role__c=userRole;
        e.Name=title;
        e.apexStackTrace__c=stackTrace;
        e.calloutInfo__c = callouts;
        e.User_Profile__c = userProfile;
        insert e;
        return e.Id;
        **************/
            return null;
    }

    public static List<String> splunkLogErrors(String title, List<String> descriptions) {
   /******************
        String userRole = UserUtil.getLoggedInUser().userRole.name;
        String userProfile = UserUtil.getLoggedInUserProfile();
        String env = UserInfo.getUserName().substringAfterLast('.');
        List<Error__c> errors = new List<Error__c>();
        for(String description : descriptions){
            Error__c e=new Error__c(
                    Name = title,
                    Component__c='apex',
                    Description__c= (description.length()>=255?description.substring(0,255):description),
                    User_Role__c=userRole,
                    User_Profile__c=userProfile,
                    Environment__c=env
            );
            errors.add(e);

        }
        insert errors;
        List<String> ids = new List<String>();
        for(Error__c e : errors){
            ids.add(e.id);
        }
        return ids;
        *************/
            return null;
    }

    public static void splunkLogErrorBackend(String title, String description, String apexClass, String stackTrace) {
        String sandbox = URL.getSalesforceBaseUrl().getHost();
        String environment;
        String regex = '.*?\\-\\-([^\\.]*).*';
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(sandbox);
        if (m.matches()) {
            environment = m.group(1);
        } else {
            environment = 'PROD';
        }

        if(stackTrace==null||stackTrace.equalsIgnoreCase('')||stackTrace.equalsIgnoreCase('()')){
            try {
                //This is to get a stack trace
                String failure = null;
                failure.length();
            } catch (System.Exception ex) {
                stackTrace = ex.getStackTraceString();
            }
        }

    //    splunkLogError(apexClass, description, environment, title, stackTrace, JSON.serialize(PruHttp.transactionLogs));

        //referesh transactionLogs because otherwise they will get logged more than once
  //      PruHttp.transactionLogs = new List<APILoggingServiceDTO>();
    }

    public static void splunkLogErrorBackend(String title, String description, String apexClass) {
        splunkLogErrorBackend(title, description, apexClass, null);
    }

    public static List<String> splunkLogErrorBackendBulk(String title, List<String> descriptions, String apexClass) {
       /*************************
        String userRole = '';
        String userProfile = UserUtil.getLoggedInUserProfile();
        String env = '';
        if (apexClass.equals('PublishToPruPubSub')) {
            userRole = 'System';
        } else {
            userRole = UserUtil.getLoggedInUser().userRole.name;
            env = UserInfo.getUserName().substringAfterLast('.');
        }

        List<Error__c> errors = new List<Error__c>();
        for (String description : descriptions){
            Error__c e=new Error__c(
                    Name = title,
                    Component__c = apexClass,
                    Description__c=(description.length()>=255?description.substring(0,255):description),
                    User_Role__c = userRole,
                    User_Profile__c=userProfile,
                    Environment__c = env
            );
            errors.add(e);
        }
        insert errors;
        List<String> ids = new List<String>();
        for(Error__c e : errors){
            ids.add(e.id);
        }
        return ids;
        *******************/
            return null;
    }

    public static List<String> splunkLogErrorBackendWithTransactionId(String title, String apexClass, String stackTrace, Map<String,String> transactionIds) {
      /**********
        String sandbox = URL.getSalesforceBaseUrl().getHost();
        String environment;
        String regex = '.*?\\-\\-([^\\.]*).*';
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(sandbox);
        if (m.matches()) {
            environment = m.group(1);
        } else {
            environment = 'PROD';
        }

        if(stackTrace==null||stackTrace.equalsIgnoreCase('')||stackTrace.equalsIgnoreCase('()')){
            try {
                //This is to get a stack trace
                String failure = null;
                failure.length();
            } catch (System.Exception ex) {
                stackTrace = ex.getStackTraceString();
            }
        }

        String userRole = UserUtil.getLoggedInUser().userRole.name;
        String userProfile = UserUtil.getLoggedInUserProfile();
        List<Error__c> errors = new List<Error__c>();
        for(String key : transactionIds.keySet()){
            Error__c e=new Error__c(
                    Name = title,
                    Component__c = apexClass,
                    Description__c=transactionIds.get(key).length()>=255?transactionIds.get(key).substring(0,255):transactionIds.get(key),
                    User_Role__c = userRole,
                    User_Profile__c=userProfile,
                    Environment__c = environment,
                    apexStackTrace__c = stackTrace,
                    TransactionId__c = key
            );
            errors.add(e);
        }
        insert errors;
        List<String> ids = new List<String>();
        for(Error__c e : errors){
            ids.add(e.id);
        }
        return ids;
        *************/
        return  null;
    }

}