@RestResource(urlMapping='/userlogin/*')
global class userlogin{
    @HttpGet
    global static String doGet() {
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
       // String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
       // Account result = [SELECT Id, Name, Phone, Website FROM Account WHERE Id = :accountId];
        return 'result';
    }
    
    @HttpPost
    global static LoginResponse  doPost() {
     LoginResponse objResponse = new LoginResponse();
       
        RestRequest req = RestContext.request;
        RestResponse res = RestContext.response;
       // String accountId = req.requestURI.substring(req.requestURI.lastIndexOf('/')+1);
       // Account result = [SELECT Id, Name, Phone, Website FROM Account WHERE Id = :accountId];
       Map<String,Object> usercredentials = (map<string,Object>)JSON.deserializeUntyped(req.requestBody.toString());
       string username = (string)usercredentials.get('email');//'asdjfasdasd@asdas.com';
       string password = (string)usercredentials.get('password');//'abcd1234';
         
     
           String domain ='login';
         
        try{
            string loginXML = '<?xml version="1.0" encoding="utf-8"?>';  
         //   loginXML += '<soapenv:Envelope xmlns:soapenv="<a class="vglnk" href="http://schemas.xmlsoap.org/soap/envelope/" rel="nofollow"><span>http</span><span>://</span><span>schemas</span><span>.</span><span>xmlsoap</span><span>.</span><span>org</span><span>/</span><span>soap</span><span>/</span><span>envelope</span><span>/</span></a>" xmlns:urn="urn:enterprise.soap.sforce.com">';  
            loginXML += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:enterprise.soap.sforce.com">';
            loginXML += '<soapenv:Header>';  
            loginXML += '<urn:LoginScopeHeader>';  
            loginXML += '<urn:organizationId>'+ '00D6F000001omOM' +'</urn:organizationId>';  
            loginXML += '</urn:LoginScopeHeader>';  
            loginXML += '</soapenv:Header>';  
            loginXML += '<soapenv:Body>'; 
            loginXML += '<urn:login>';
            loginXML += '<urn:username>'+ username +'</urn:username>';
            loginXML += '<urn:password>'+ password +'</urn:password>';
            loginXML += '</urn:login>'; 
            loginXML += '</soapenv:Body>';  
            loginXML += '</soapenv:Envelope>';
             
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://login.salesforce.com/services/Soap/c/48.0');
            request.setTimeout(60000); 
            request.setMethod('POST');
            request.setHeader('SOAPAction', 'login');
            request.setHeader('Accept','text/xml');
            request.setHeader('Content-Type', 'text/xml;charset=UTF-8');
            request.setBody(loginXML);       
            HttpResponse response = new Http().send(request);
             
            String responseBody =  response.getBody();
            String sessionId = getValueFromXMLString(responseBody, 'sessionId');
             
            objResponse.statusMessage = responseBody ;//response.getStatus();
            objResponse.statusCode = response.getStatusCode();
             
            if(string.isNotBlank(sessionId)){
                objResponse.isSuccess = true;
                objResponse.sessionId = sessionId;
                 
            }else{
                objResponse.isSuccess = false;
            }
        }
        catch(System.Exception ex){
            objResponse.isSuccess = false;
            objResponse.statusMessage = ex.getMessage();
        }
        system.debug('objResponse-' + objResponse);
       return objResponse;
      //  return req.requestBody.toString();
    }
    
    
     public static string getValueFromXMLString(string xmlString, string keyField){
        String xmlKeyValue = '';
        if(xmlString.contains('<' + keyField + '>')){
            try{
                xmlKeyValue = xmlString.substring(xmlString.indexOf('<' + keyField + '>')+keyField.length() + 2, xmlString.indexOf('</' + keyField + '>'));   
            }catch (exception e){
                 
            }            
        }
        return xmlKeyValue;
    }
     
    global class LoginResponse {
        public String sessionId {get; set;}
        public Boolean isSuccess {get; set;}
        public String statusMessage {get; set;}
        public Integer statusCode {get; set;}
    }
}