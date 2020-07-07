({
	myAction : function(cmp, event, helper) {
		console.log('otherData in lview ',JSON.stringify(cmp.get('v.otherData')));
        cmp.set('v.lviewName','AllAccounts');
        cmp.set('v.renderListView',true);
	}
})