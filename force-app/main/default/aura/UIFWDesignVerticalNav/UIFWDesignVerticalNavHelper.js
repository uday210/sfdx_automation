/**
 * Created by x213555 on 6/27/19.
 */
({
    targetSelected: function targetSelected(component) {
        let index = 0;
        let items = component.get('v.item.items');
        if(!items) return;
        findIndex : {
            for (let item of items) {
                if (item._selected % 2 == 1) break findIndex;
                index += 1;
            }
            return;
        }
        let targetHelpers = component.find('targetHelpers');
        if(!targetHelpers) return;
        if (!Array.isArray(targetHelpers)) {
            targetHelpers.setTarget();
            return;
        }
        targetHelpers[index].setTarget();
    }
})