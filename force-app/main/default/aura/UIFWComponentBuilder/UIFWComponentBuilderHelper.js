/**
 * Created by x213555 on 5/23/19.
 */
({
    prepareForSave: function prepareForSave(componentJSON) {
        componentJSON = this.removeUnderscoreVariables(componentJSON);

        const temp = this.generateDataItemMap(componentJSON);
        componentJSON = temp.componentJSON;
        componentJSON.dataItems = temp.dataItems;

        componentJSON = this.forceStrings(componentJSON);
        //move items to layouts.default.items
        componentJSON.layouts = {};
        componentJSON.layouts.default = {};
        componentJSON.layouts.default.items = componentJSON.items;
        delete componentJSON.items;

        componentJSON.version = Number(componentJSON.version)||1;
        componentJSON.isActive = componentJSON.isActive==='true';
        return JSON.stringify(componentJSON);
    },
    forceStrings: function forceStrings(item) {
        if (!item) {
            return item;
        }
        if(item.dataItems) {
            item.dataItems = item.dataItems.map((dataItem)=>this.forceStrings(dataItem));
        }
        if (item.items) {
            item.items = item.items.map((item)=>this.forceStrings(item));
        }
        let newItem = {};
        Object.entries(item).forEach(([key, value]) => {
            newItem[String(key)]=Array.isArray(value)?value:String(value);
        });
        return newItem;
    },
    generateDataItemMap: function generatedataItemMap(componentJSON) {
        let dataItems = [];
        let subroutine = function subroutine(item) {
            if (!item) {
                return item;
            }
            if (item.type==='field'||item.type==='table') {
                let dataItemEntry = {
                    dataItemId: dataItems.length,
                }
                Object.entries(item).forEach(([key,value])=>{
                    if (key==='type') {
                        return;
                    }
                    if (key==='subtype') {
                        dataItemEntry.type=value;
                        return;
                    }
                    if(key==='items') {
                        return;
                    }
                    delete item[key];
                    dataItemEntry[key]=value;
                });
                item.dataItemId = dataItems.length;
                dataItems.push(dataItemEntry);
            }else if (item.type==='Iteration') {
                //currently writing to both dataItems and local data source
                //todo remove
                let dataItemEntry = {
                    dataItemId: dataItems.length,
                }
                Object.entries(item).forEach(([key,value])=>{
                    if (key==='type') {
                        dataItemEntry.type=value;
                        return;
                    }
                    if(key==='items') {
                        return;
                    }
                    dataItemEntry[key]=value;
                });
                item.dataItemId = dataItems.length;
                dataItems.push(dataItemEntry);
            }
            if (item.items) {
                item.items = item.items.map((item)=>subroutine(item));
            }
            return item;
        }
        componentJSON = subroutine(componentJSON);
        return {
            dataItems,
            componentJSON,
        }
    },
    removeUnderscoreVariables: function removeUnderscoreVariables(componentJSON) {
        let subroutine = function subroutine(item) {
            if(!item) {
                return item;
            }
            Object.keys(item).forEach((key)=>{
                if (key.match(/_.+/)) {
                    delete item[key];
                }
            });
            if (item.items) {
                item.items = item.items.map((item)=>subroutine(item));
            }
            return item;
        }
        return subroutine(componentJSON);
    },
})