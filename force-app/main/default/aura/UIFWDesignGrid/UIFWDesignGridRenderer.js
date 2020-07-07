/**
 * Created by x213555 on 7/18/19.
 */
({
    unrender: function unrender(component, helper) {
        if(component.get('v.item')) {
            if (!component.get('v.item._targeted')) {
                component.set('v.item._hasBeenUntargeted', true);
                component.set('v.item._forceCollapse', (component.get('v.item._forceCollapse') || 0) + 1);
            } else {
                component.set('v.item._forceCollapse', 0);
            }
            clearTimeout(component.get('v.item._collapseTimeout'));
        }
        return this.superUnrender(component, helper);
    }
})