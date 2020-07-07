/**
 * Created by x213555 on 5/15/19.
 */
({
    onInit: function(component, event, helper) {
        let entries={};
        Object.keys(uifwComponents).map((type)=>{
            if (!(uifwComponents[type].menuSection in entries)) {
                entries[uifwComponents[type].menuSection]={
                    menuLabel: uifwComponents[type].menuSection,
                    types: [],
                }
            }
            let entry = uifwComponents[type];
            entry.type=type;
            entries[uifwComponents[type].menuSection].types.push(entry);
        });
        if (entries._hidden) {
            delete entries._hidden;
        }
        entries = Object.values(entries).sort((a,b)=>{
            return a.menuLabel.localeCompare(b.menuLabel);
        }).map((entry)=>{
            entry.types = entry.types.sort((a,b)=>{
                return a.displayName.localeCompare(b.displayName);
            });
            return entry;
        });
        component.set('v.entries', entries);
        component.set('v.filteredEntries', entries);
    },
    startDrag: function startDrag(component, event, helper) {
        let type = event.target.dataset.type;
        let section = event.target.dataset.section;
        component.set('globalStorage.UIFW_draggedItemType', true);
        event.dataTransfer.setData("draggedItemName", type);
        event.dataTransfer.setData("draggedItemSection", section);
    },
    endDrag: function(component, event, helper) {
        component.set('globalStorage.UIFW_draggedItemType', null);
    },
    updateFilter: function(component, event, helper) {
        if (component.get('v.filter')) {
            let matcher = component.get('v.filter').toLowerCase().split(' ');
            let entries = JSON.parse(JSON.stringify(component.get('v.entries')));
            entries = entries.map((entry)=>{
                entry.types=entry.types.filter((type)=>{
                   return helper.fuzzyMatch(type.displayName, matcher);
                });
                return entry;
            });
            component.set('v.filteredEntries', entries);
        }
        else {
            component.set('v.filteredEntries', JSON.parse(JSON.stringify(component.get('v.entries'))));
        }
    }
})