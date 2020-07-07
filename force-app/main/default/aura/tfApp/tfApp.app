<aura:application >
	<ltng:require scripts="{!join(',',
    $Resource.tf)}" afterScriptsLoaded="{!c.doInit}"/>
</aura:application>