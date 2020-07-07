<aura:application >
	<aura:attribute name="status" type="String" default="closed"/>
    <lightning:select aura:id="select" name="select" label="Opportunity Status" value="{!v.status}">
        <option value="">choose one...</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
        <option value="closedwon">Closed Won</option>
    </lightning:select>

</aura:application>