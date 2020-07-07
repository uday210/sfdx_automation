/**
 * Created by x213555 on 6/4/19.
 */
({
    updateTargeted: function updateTargeted(component, event, helper) {
        let updatedItem = event.getParam("updatedItem");
        let forceUpdate = event.getParam("forceUpdate");
        let found = false;
        const subroutine = function subroutine(item) {
            if(!found) {
                if (item._targeted === 1) {
                    found=true;
                    //really confusing way of setting item to the updatedItem while maintaining the same pointer
                    Object.keys(item).forEach((key)=>{
                        if (key!=='_selected') {
                            delete item[key];
                        }
                    });
                    Object.keys(updatedItem).forEach((key)=> {
                        item[key]=updatedItem[key];
                    });
                    item._targeted = 1;
                    return item;
                }
                if (Array.isArray(item)) {
                    return item.map((entry) => {
                        return subroutine(entry)
                    });
                }
                if (item && item.items) {
                    item.items = item.items.map((entry) => {
                        return subroutine(entry)
                    });
                }
            }
            return item;
        };
        component.set('v.componentJSON.items', subroutine(component.get('v.componentJSON.items')));
        if (forceUpdate) {
            component.set('globalStorage.uifwForceSidebarRecalc', true);
            component.set('globalStorage.uifwForceSidebarRecalc', false);
        }
        component.set('globalStorage.uifwForceRerender', true);
        component.set('globalStorage.uifwForceRerender', false);
    },
    deleteTargeted: function (component, event, helper) {
        const subroutine = function subroutine(items) {
            if (!Array.isArray(items)) {
                return items;
            }
            items = items.filter((item)=>{
                if (item) {
                    return !item._targeted;
                }
                return true;
            }).map((item)=>{
                if (item && item.items) {
                    item.items = subroutine(item.items);
                    return item;
                }
            });
            return items;
        };
        component.set('v.componentJSON.items', subroutine(component.get('v.componentJSON.items')));
        component.set('globalStorage.showUIFWDesignAttributeEditor', false);
        component.set('globalStorage.uifwForceSidebarRecalc', true);
        component.set('globalStorage.uifwForceSidebarRecalc', false);
        component.set('globalStorage.uifwForceRerender', true);
        component.set('globalStorage.uifwForceRerender', false);
    },
    retrieveScopedVariablesForTarget: function (component, event, helper) {
        let variableSelections = {};
        //get global variables
        let dataSources = component.get('v.componentJSON.dataSources')||[];
        dataSources.forEach((source)=>{
            let temp = variableSelections[source.dataSourceType]||{};
            temp[source.variableName]=source;
            variableSelections[source.dataSourceType]=temp;
        });

        //get context variables
        let keys = {};
        const subroutine = function subroutine(item) {
            if (item._targeted === 1) {
                return true;
            }
            if (Array.isArray(item)) {
                return item.map((entry) => {
                    let result = subroutine(entry);
                    if (
                        result
                        && entry.variableName
                        && !(entry._targeted===1)
                    ) {
                        keys[entry.variableName] = {
                            fieldName: entry.fieldName,
                            sample: entry.sample,
                        }
                    }
                    return result;
                }).reduce((found, entry)=>(found||entry), false);
            }
            if (item && item.items) {
                return item.items.map((entry) => {
                    let result = subroutine(entry);
                    if (result && entry.variableName) {
                        keys[entry.variableName] = {
                            dataSourceType: entry.dataSourceType,
                            dataSourceName: entry.dataSourceName,
                            fieldName: entry.fieldName,
                            sample: entry.sample,
                        }
                    }
                    return result;
                }).reduce((found, entry)=>(found||entry), false);
            }
            return false;
        }
        subroutine(component.get('v.componentJSON.items'));
        if (Object.keys(keys).length) {
            variableSelections.context = keys;
        }

        component.set('globalStorage.uifwScopedVariables', variableSelections);
    },
    onLoad: function (component, event, helper) {
        component.set('v.uifwComponentsLoaded', true);
    }
})