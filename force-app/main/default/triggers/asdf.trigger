trigger asdf on Account (before update) {

    System.debug('>>>>>>>>>>>>>>>>> '+trigger.old[0]);
    trigger.new[0].MyDemoHtml__c = trigger.new[0].demoE__c;
}