/**
 * Created by x213555 on 6/26/19.
 */
({
    flicker: function flicker(component, event, helper) {
        component.set('v.flicker', false);
        component.set('v.flicker', true);
        event.stopPropagation();
    },
    init: function init(component, event, helper) {
        let items = component.get('v.item.items');
        if(!items.length) {
            return;
        }
        //if nothing is selected, select the first
        if(!items.reduce((accumulator, item)=>{
                return accumulator||(item._selected%2);
            }, items[0]._selected%2)) {
            items[0]._selected=1;
            component.set('v.item.items', items);
        }
    },
    select: function select(component, event, helper) {
        //close open sections
        let items = component.get('v.item.items');
        items = items.map((item)=>{
            if(!item._selected) {
                item._selected=0;
            }
            if(item._selected%2) {
                item._selected%=2;
                item._selected+=1;
            }
            return item;
        });
        //open selected section
        items[event.currentTarget.dataset.value]._selected%=2;
        items[event.currentTarget.dataset.value]._selected+=1;

        component.set('v.item.items', items);

        //target selected section in the attribute editor
        helper.targetSelected(component);
    },
    target: function target(component, event, helper) {
        component.find('targetHelper').setTarget();
    },
    addItem: function addItem(component, event, helper) {
        component.find('anchorPoint').addItem('tabContent').then($A.getCallback((items)=>{
            //close all existing sections
            items = items.map((item)=>{
                if(!item._selected) {
                    item._selected=0;
                }
                if(item._selected%2) {
                    item._selected%=2;
                    item._selected+=1;
                }
                return item;
            });
            //open last section
            items[items.length-1]._selected=1;
            component.set('v.item.items', items);
        }));
    },
    changeHovered: function changeHovered(component, event, helper) {
        let subroutine = function subroutine(component) {
            let timeout = component.get('v.hoverTimeout');
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = window.setTimeout($A.getCallback(() => {
                let itemTitles = component.find('itemTitle');
                if (!itemTitles) {
                    return;
                }
                if (!Array.isArray(itemTitles)) {
                    itemTitles = [itemTitles];
                }
                let changed = false;
                let item = component.get('v.item');
                itemTitles.forEach((itemTitle, index) => {
                    let hovered = itemTitle.getElement().matches(':hover');
                    if (hovered != item.items[index]._hovered) {
                        item.items[index]._hovered=hovered;
                        changed=true;
                    }
                });
                component.set('v.item', item);
                if (changed) {
                    //fire a follow up event to confirm that element is still hovered after lightning finishes rendering
                    subroutine(component);
                }
            }), 50);
            component.set('v.hoverTimeout', timeout);
        }
        subroutine(component);
    }
})