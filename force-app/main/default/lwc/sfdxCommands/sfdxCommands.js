import { LightningElement,track } from 'lwc';

export default class SfdxCommands extends LightningElement {

        alliasNameIs = 'ALIASNAME';
        emailIs='user@orgname.com';
		@track commandsList = [{
            'Name':'Alias Commands',
            'Commands':[
                'sfdx force:alias:list',
                'sfdx force:alias:set '+this.alliasNameIs+'='+this.emailIs,
               // 'sfdx force:alias:set YourAlias=username@example.com YourOtherAlias=devhub@example.com',
                
            ]
        },{
            'Name':'Auth Commands',
            'Commands':[
                'sfdx force:auth:list',
                'sfdx force:auth:logout -u '+this.emailIs,
                'sfdx force:auth:logout -a',
                'sfdx force:auth:logout -p',
                'sfdx force:auth:web:login -a TestOrg1',
                'sfdx force:auth:web:login -i <OAuth client id>',
                'sfdx force:auth:web:login -r https://test.salesforce.com',
                'sfdx force:auth:device:login'
                
            ]
        },{
            'Name':'Data Commands',
            'Commands':[
                'sfdx force:data:record:get -u '+this.alliasNameIs+' -s ACCOUNT -i 0016F000038CdPg',
                'sfdx force:data:record:get -u '+this.alliasNameIs+' -s ACCOUNT -i 0016F000038CdPg --json',
                'sfdx force:data:record:get -s Account -w "Name=Acme" -u YourAlias1',
                'sfdx force:data:record:get -s Account -w "Name=\'Universal Containers\' Phone=\'(123) 456-7890\'"',
                'sfdx force:data:tree:export -u myownorg -q "SELECT Name,(Select Name,Email From Contacts) from Account"'
                
            ]
        },{
            'Name':'Doc Commands',
            'Commands':[
               'sfdx force:doc:commands:list',
               'sfdx force:doc:commands:list --json' 
            ]
        },{
            'Name':'Limits Commands',
            'Commands':[
               'sfdx force:limits:api:display -u '+this.alliasNameIs,
            ]
        },{
            'Name':'Metadata Commands',
            'Commands':[
               'sfdx force:mdapi:retrieve -r C:\Users\UKiran.PI\Desktop\projects\mdapi -u YourAlias1 -k C:\Users\UKiran.PI\Desktop\projects\mdapi\package.xml',
            ]
        }];
}