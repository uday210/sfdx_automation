/**
 * Created by x213555 on 6/4/19.
 */
({
    clearTargets: function(component, event, helper) {
        component.set('globalStorage.changeUIFWDesignTarget', true);
        component.set('globalStorage.changeUIFWDesignTarget', false);
    },
    setTarget: function(component, event, helper) {
        component.set('v.targetField', 2);
        component.set('globalStorage.changeUIFWDesignTarget', true);
        component.set('globalStorage.changeUIFWDesignTarget', false);
        component.set('globalStorage.showUIFWDesignAttributeEditor', true);
    },
    openSidebar: function(component, event, helper) {
        component.set('globalStorage.uifwForceSidebarRecalc', true);
        component.set('globalStorage.uifwForceSidebarRecalc', false);
        component.set('globalStorage.showUIFWDesignAttributeEditor', true);
    },
    closeSidebar: function(component, event, helper) {
        component.set('globalStorage.showUIFWDesignAttributeEditor', false);
    }
})