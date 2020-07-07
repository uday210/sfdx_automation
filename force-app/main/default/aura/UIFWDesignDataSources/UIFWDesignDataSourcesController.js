/**
 * Created by x213555 on 8/28/19.
 */
({
    addDataSource: function addDataSource(component, event, helper) {
        component.set('v.dataSources', (component.get('v.dataSources')||[]).concat([{}]));
    },
    deleteSource: function deleteSource(component, event, helper) {
        component.set('v.flicker', false);
        let dataSources = JSON.parse(JSON.stringify(component.get('v.dataSources')));
        dataSources.splice(event.currentTarget.dataset.value, 1);
        component.set('v.dataSources', dataSources);
        component.set('v.flicker', true);
    }
})