({
	doInit : function(component, event, helper) {
        var alliasNameIs = component.get('v.alsName');
        var emailIs=component.get('v.orgEmail');
		var commandsList = [];
        commandsList.push({
            'Name':'Alias Commands',
            'Commands':[
                'sfdx force:alias:list',
                'sfdx force:alias:set '+alliasNameIs+'='+emailIs,
               // 'sfdx force:alias:set YourAlias=username@example.com YourOtherAlias=devhub@example.com',
                
            ]
        });
                
         commandsList.push({
            'Name':'Auth Commands',
            'Commands':[
                'sfdx force:auth:list',
                'sfdx force:auth:logout -u '+emailIs,
                'sfdx force:auth:logout -a',
                'sfdx force:auth:logout -p',
                'sfdx force:auth:web:login -a TestOrg1',
                'sfdx force:auth:web:login -i <OAuth client id>',
                'sfdx force:auth:web:login -r https://test.salesforce.com',
                'sfdx force:auth:device:login'
                
            ]
        });
	  commandsList.push({
            'Name':'Data Commands',
            'Commands':[
                'sfdx force:data:record:get -u '+alliasNameIs+' -s ACCOUNT -i 0016F000038CdPg',
                'sfdx force:data:record:get -u '+alliasNameIs+' -s ACCOUNT -i 0016F000038CdPg --json',
                'sfdx force:data:record:get -s Account -w "Name=Acme" -u YourAlias1',
                'sfdx force:data:record:get -s Account -w "Name=\'Universal Containers\' Phone=\'(123) 456-7890\'"',
                'sfdx force:data:tree:export -u myownorg -q "SELECT Name,(Select Name,Email From Contacts) from Account"'
                
            ]
        });
 commandsList.push({
            'Name':'Doc Commands',
            'Commands':[
               'sfdx force:doc:commands:list',
               'sfdx force:doc:commands:list --json' 
            ]
        }); 
        
         commandsList.push({
            'Name':'Limits Commands',
            'Commands':[
               'sfdx force:limits:api:display -u '+alliasNameIs,
            ]
        }); 
        commandsList.push({
            'Name':'Metadata Commands',
            'Commands':[
               'sfdx force:mdapi:retrieve -r C:\\Users\\UKiran.PI\\Desktop\\projects\\mdapi -u YourAlias1 -k C:\\Users\\UKiran.PI\\Desktop\\projects\\mdapi\\package.xml',
            ]
        });         
        component.set('v.commands',commandsList);        
	},
    myFunction:function(cmp,event,helper){
         var selectedItem = event.currentTarget;
         var recId = selectedItem.dataset.id;
         var copyText = document.getElementById(recId);
		//alert(copyText.innerText);
  /* Select the text field */
        
        var copyTextHidden = document.getElementById('myInput');
        copyTextHidden.value = copyText.innerText;
  copyTextHidden.select();
  copyTextHidden.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyTextHidden.value);
    }
})