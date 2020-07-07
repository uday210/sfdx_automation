<aura:application extends="force:slds">
    <aura:handler name="init" value="{!this}" action="{!c.myAction}"/>
    <c:DynamicEvalCmp aura:id="ExpressionEvalCmp"/>
</aura:application>