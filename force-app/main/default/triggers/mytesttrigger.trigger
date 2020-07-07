trigger mytesttrigger on Opportunity (before insert,before update) {
Opportunity  opp = trigger.new[0];
string link = '';
if(Userinfo.getUiThemeDisplayed()=='Theme3'){
//in classic
link = '<a>clickHere</a>';
}else{
//in lightning
    link = '';
}
opp.addError('Hello world '+link,false);

system.debug('>>> user theme '+Userinfo.getUiThemeDisplayed());
}