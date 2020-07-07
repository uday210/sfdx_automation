<aura:application extends="force:slds">
     <aura:attribute name="commands" type="Object" />
     <aura:attribute name="alsName" type="String" default="ALIASNAME"/>
     <aura:attribute name="orgEmail" type="String" default="user@yourorg.com"/>
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    <div style="display:none">
    <input type="text" value="Hello World" id="myInput"/>
    </div> 
   
    Commands :
    <lightning:accordion aura:id="accordion" >
        <aura:iteration items="{!v.commands}" var="eachSection" indexVar="i">
        	<lightning:accordionSection name="{!eachSection.Name}" label="{!eachSection.Name}">
            	<aura:iteration items="{!eachSection.Commands}" var="eachCommand" indexVar="j">
                	<ui:message title="" severity="info" closable="false">
						<span id="{!i+'_'+j}">{!eachCommand}</span>
                        <span data-id="{!i+'_'+j}" onclick="{! c.myFunction }" style="float: right;">
                        <lightning:buttonIcon  iconName="utility:copy" variant="bare"  alternativeText="Settings" />
    					</span>	
					</ui:message>
                </aura:iteration>
            </lightning:accordionSection> 
        </aura:iteration>
    </lightning:accordion>
</aura:application>