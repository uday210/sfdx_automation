<aura:application extends="force:slds">
    <aura:attribute type="String" name="data"></aura:attribute>
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    <c:DynamicChart aura:id="compId" chartType='bar' 
                    chartTitle='Hotel Performance vs. Prior Year' 
                    chartSubTitle=''
                    xAxisCategories="['OCCUPANCY', 'ADR', 'ROOM REVENUE']"
                    yAxisParameter='$ or %'
                    data="{!v.data}"/>
</aura:application>