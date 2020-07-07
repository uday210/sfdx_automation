({
	
    myAction : function(component, event, helper) {
        var dynamicFormula = "other = ACTUALVALUE_FROM_RECORD? FieldUpdate , test =ACTUALVALUE_FROM_RECORD?1:2 ";
        dynamicFormula = dynamicFormula.replace('ACTUALVALUE_FROM_RECORD','test').replace('ACTUALVALUE_FROM_RECORD','test');
        var calcCmp = component.find("ExpressionEvalCmp");
        console.log('dynamicFormula ',dynamicFormula);
var calcValue = calcCmp.evalExpression('text',dynamicFormula);// 'other = other? FieldUpdate , SendEmail');
console.log('calcValue ',calcValue);
        var calcValue1 = calcCmp.evalExpression('text',calcValue);// 'other = other? FieldUpdate , SendEmail');

        alert(calcValue1);
	}
})