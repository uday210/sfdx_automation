/**
 * Created by x213555 on 7/17/19.
 */
({
    init: function  init(component, event, helper) {
        if (component.get('v.item.layout')) {
            let layout = component.get('v.item.layout').trim()
                .replace(/[ ]+/g, ' ')
                .split('\n')
                .map((row) => {
                    let items = row.trim().split(' ');
                    row = '"';
                    items.forEach((entry) => {
                        if (entry!=='.') {
                            row += 'loc' + entry + ' ';
                        }
                        else {
                            row+='. ';
                        }
                    });
                    row += '"';
                    return row;
                })
                .reduce((accumulator, val) => {
                    return accumulator + '' + val;
                });
            component.set('v.gridLayout', layout);
        }
    },
    target: function target(component, event, helper) {
        component.find('targetHelper').setTarget();
    },
    checkCollapse: function checkCollapse(component, event, helper) {
        let timeout = window.setTimeout($A.getCallback(()=>{
            if(component.get('v.item')) {
                if (!component.get('v.item._targeted')) {
                    component.set('v.item._hasBeenUntargeted', true);
                    component.set('v.item._forceCollapse', (component.get('v.item._forceCollapse') || 0) + 1);
                } else {
                    component.set('v.item._forceCollapse', 0);
                }
            }
        }), 250);
        clearTimeout(component.get('v.item._collapseTimeout'));
        if (component.get('v.item')) {
            component.set('v.item._collapseTimeout', timeout);
        }
    },
})