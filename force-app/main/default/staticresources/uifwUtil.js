window.uifwUtil = (function () {
        /* Private variables */

    return {
        /* Public methods variables */
        scriptLoaded: function () {
            return true;
        },
        fireSObjectEvent: function (component, event, eventName, responseType, action) {
            var srEvent = component.getEvent(eventName);
            var error = event.getParams().error;
            var data = event.getParams().response;
            var action = action === undefined ? "" : action;
            var response = [];
            switch (responseType) {
                case "error":
                    action: "submit";
                    response.push(error);
                    break;
                case "success":
                    action: "submit";
                    response = data;
                    break;
                case "cancel":
                    action: "cancel";
                    response: "User cancelled the operation";
                default:
                    action: action;
                    response = [];
            }
            srEvent.setParams({
                "action": action,
                "responseType": responseType,
                "response": response
            });
            srEvent.fire();
        },
        enqueueServerAction: function (component, actionName, params) {
            return new Promise(function (resolve, reject) {
                var action = component.get('c.' + actionName);
                action.setParams(params);
                action.setCallback(this, function (response) {
                    if (response.getState() === "SUCCESS") {
                        resolve(response.getReturnValue());
                    } else {
                        reject(response.getError());
                    }
                });
                $A.enqueueAction(action);
            });
        },
        //executes all actions at same time
        executeAll: function (actionList) {
            return Promise.all(actionList);
        },
        //resolve actions in sequence as it in list
        resolveInSequence: function (actionList) {
            actionList.reduce((promise, eachAction) => {
                    return promise.then(() => eachAction);
            }, Promise.resolve());
        },
        //Fire an event
        fireComponentEvent: function (component, eventName, params) {
            var event = component.getEvent(eventName);
            event.setParams(params);
            event.fire();
        },
        // Remove _rowId and _rowState added by uifw logic
        removeUIFWTableKeys: function (rowArray) {
            rowArray = rowArray.map((row) => {
                            delete row._rowid;
                            delete row._rowstate;
                            delete row._display;
                            return row;
                        });
            return rowArray;
        },
        generateIdfromName: function (inputStr) {
            /*
                1. Trim
                2. RemoveWhitePaces
                3. Remove special characters
                4. Lower case the string
             */
            if (inputStr === '' || inputStr === undefined) {
                return null;
            }
            inputStr = inputStr.trim().toLowerCase();
            inputStr = inputStr.replace(/[^0-9a-zA-Z]/g, "");
            return inputStr;
        },
        containsSpecialChar: function (str) {
            var regex = /[^a-z0-9_ ]/gi;
            return regex.test(str);
        },
        isEmpty: function (str) {
            var result = false;
            if (str === undefined || str === null || str === '') {
                result = true;
            }
            return result;
        },
        getAPIDataObject: function (apiName) {
            this.state = '';
            this.status = '';
            this.data = '';
            this.error = '';
        },
        getAPIDataNode: function (apiName, state, data, error) {
            var apiDataNode = {};
            apiDataNode['apiName'] = apiName;
            apiDataNode['state'] = state;
            apiDataNode['data'] = data;
            apiDataNode['error'] = error;
            return apiDataNode;
        },
        getVariableDataNode: function getVariableDataNode(variableName, state, data, error) {
            var variableDataNode = {};
            variableDataNode['variableName'] = variableName;
            variableDataNode['state'] = state;
            variableDataNode['data'] = data;
            variableDataNode['error'] = error;
            return variableDataNode;
        },
        getValueFromJSON: function (data, fieldAPIName) {
            var columnList = fieldAPIName.split('.');
            var value = data;
            for (var i = 0; i < columnList.length; i++) {
                value = value[columnList[i]];
            }
            return value;
        },
        getDesignTableAttributes : function(){
            let tableAttributes = {};
            tableAttributes['chunkSize'] = 500;
            tableAttributes['pageSize'] = 25;
            tableAttributes['allowSort'] = false;
            tableAttributes['allowFilters'] = false;
            tableAttributes['allowPagination'] = true;
            tableAttributes['allowEdit'] = false;
            tableAttributes['allowDelete'] = false;
            tableAttributes['allowGlobalSearch'] = false;
            tableAttributes['columns'] = null;
            tableAttributes['filters'] = null;
            return tableAttributes;
        },
        getDesignTableColumnNode : function(){
            return {
                fieldName : "",
                label : "",
                type : "",
                valueProvider : "",
                listOfValues : "",
                required : false,
                editable : false,
                sortable : false
            }
        },
        getDesignTableFilterNode : function(){
            return {
                fieldName : "",
                label : "",
                type : "",
                valueProvider : "",
                listOfValues : "",
                multiSelect : false
            }
        },
        isValidJSON : function(obj){
            try {
                JSON.parse(obj);
            } catch (e) {
                return false;
            }
            return true;
        },
        isJSON : function(str){
            if(!str){
                return false;
            }
            return Object.prototype.toString.call(str) === '[object Object]';
        },
        logServerError : function(component, title, message){
            var errorHandler = component.find('errorHandler');
            var error = {};
            error.title = title;
            error.description = message;
            errorHandler.displayError(error);
        },
        refreshView : function (component) {
            component.set("v.refreshView", false);
            component.set("v.refreshView", true);
        },
        getTokens : function getToken(inputString){
            let mergeFieldArray = [];
            function getTokenList(inputString){
                // If merge field exists
                if(inputString.indexOf('{{')>-1
                    && inputString.indexOf('}}')>-1
                ){
                    let startIndex = inputString.indexOf('{{');
                    let endIndex = inputString.indexOf('}}');
                    //get start word
                    if(startIndex>0){
                        let mergeField={
                            type: 'constant',
                            value: inputString.substring(0,startIndex)
                        };
                        mergeFieldArray.push(mergeField);
                    }

                    if(startIndex < endIndex){
                        //get the variable
                        let mergeField={
                            type: 'variable',
                            value: inputString.substring(startIndex+2,endIndex)
                        };
                        mergeFieldArray.push(mergeField);
                    }
                    var remainigString = inputString.substring(endIndex+2);
                    if(remainigString){
                        getTokenList(remainigString);
                    }
                }else{
                    //add static string
                    let mergeField={
                        type: 'constant',
                        value: inputString
                    };
                    mergeFieldArray.push(mergeField);
                }
            }
            getTokenList(inputString);
            return mergeFieldArray;
        },
        getFieldNode : function(){
            return {
                type: "",
                label : ""
            }
        },
        // takes token;{{api.variableName.fieldName}} returns variable: api.variableName.fieldName
        getVariableObject : function(token){
            let variable = token;
            let startIndex = token.indexOf('{{');
            let endIndex = token.indexOf('}}');
            if(startIndex < endIndex){
                variable = token.substring(startIndex+2,endIndex);
            }
            return variable;
        },
        // takes api.variableName.fieldName returns variableName
        getVariableName : function(variable){
            let firstIndex = variable.indexOf('.');
            let secondIndex = variable.indexOf('.', firstIndex+1);
            if(firstIndex>0 && secondIndex>firstIndex) {
                return variable.substring(firstIndex+1,secondIndex).toLowerCase();
            }
            return null;
        },
        // takes api.variableName.fieldName returns fieldName
        getFieldNameFromVariable : function(variable){
            let fieldName = variable;
            let firstIndex = variable.indexOf('.');
            let secondIndex = variable.indexOf('.', firstIndex+1);
            if(firstIndex>0 && secondIndex>firstIndex) {
                fieldName = variable.substring(secondIndex + 1);
            }
            return fieldName;
        },
        // This returns api from api.variableName.fieldName
        getVariableType : function(variable){
            let variableType = undefined;
            let firstIndex = variable.indexOf('.');
            if(firstIndex>0) {
                variableType = variable.substring(0, firstIndex).toLowerCase();
            }
            return variableType;
        },
        resolveTableVariable : function(tableField, dataObject, contextData, broker) {
            // Note: Table variable can not be combined with other var or static data
            let token = uifwUtil.getTokens(tableField)[0];
            let promiseArray = [];
            let tableData = [];

            if (token.type === 'variable') {
                // variable structure {{variableType.variableName.fieldName}} e.g. {{api.policyDetails.policyNumber}}, {{context.people.firstName}}
                let variableType = uifwUtil.getVariableType(token.value);
                let fieldName = uifwUtil.getFieldNameFromVariable(token.value);
                let dataSourceVariable = uifwUtil.getVariableName(token.value);

                if (variableType === 'api') {
                    let dataNode = dataObject['api'][dataSourceVariable].data;
                    let value = uifwUtil.getValueFromJSON(dataNode, fieldName);
                    //If return value is undefined then set blank
                    promiseArray.push(new Promise($A.getCallback((resolve, reject)=>{
                        //If return value is undefined then set blank
                        tableData = value ? value : [];
                        resolve(tableData);
                    })));
                }
                if(variableType === 'context'){
                    let value = uifwUtil.getValueFromJSON(contextData, fieldName);
                    promiseArray.push(new Promise($A.getCallback((resolve, reject)=>{
                        //If return value is undefined then set blank
                        tableData = value ? value : [];
                        resolve(tableData);
                    })));
                }
                if(variableType === 'broker' && broker){
                    promiseArray.push(broker.waitForKey(fieldName)
                        .then($A.getCallback((value)=>{
                            return (uifwUtil.isEmpty(value) ? '' : value);
                    })));
                }
            }
            return tableData;
        },

        resolveVariable : function(fieldName, dataObject, contextData, broker){
            //input fieldName could be : XXYYSS - {{type.typeVariable.fieldKey}} - {{context.people.firstName}}
            let fieldTokens = uifwUtil.getTokens(fieldName);
            let promiseArray = [];
            let fieldValue='';
            /* Field token structure
            { type  : variable/constant
              value : value
             }
             */
            fieldTokens.forEach((token)=>{
                if(token.type === 'variable'){
                    let variableType = uifwUtil.getVariableType(token.value);
                    let fieldName = uifwUtil.getFieldNameFromVariable(token.value);
                    let dataSourceVariable = uifwUtil.getVariableName(token.value);

                    if(variableType === 'api'){
                        let dataNode =  dataObject['api'][dataSourceVariable].data;
                        let value = uifwUtil.getValueFromJSON(dataNode, fieldName);
                        promiseArray.push(new Promise($A.getCallback((resolve, reject)=>{
                            //If return value is undefined then set blank
                            fieldValue = uifwUtil.isEmpty(value) ? '' : value;
                            resolve(fieldValue);
                        })));
                    }
                    if(variableType === 'context'){
                        let value = uifwUtil.getValueFromJSON(contextData, fieldName);
                        promiseArray.push(new Promise($A.getCallback((resolve, reject)=>{
                            fieldValue = uifwUtil.isEmpty(value) ? '' : value;
                            resolve(fieldValue);
                        })));
                    }
                    if(variableType === 'broker' && broker){
                        promiseArray.push(broker.waitForKey(fieldName)
                            .then($A.getCallback((value)=>{
                                return (uifwUtil.isEmpty(value) ? '' : value);
                        })));
                    }
                }else{
                    let value = token.value;
                    promiseArray.push(new Promise($A.getCallback((resolve, reject)=>{
                        fieldValue = uifwUtil.isEmpty(value) ? '' : value;
                        resolve(fieldValue);
                    })));
                }
            });
            return promiseArray;
        },

        convertStringToOptions : function convertStringToOptions(stringToConvert,sortOrder){
            //TODO: Add sort order logic here
            if(stringToConvert){
                let optionsToConvert = stringToConvert.split('\n');
                let options = [];
                optionsToConvert.forEach((value)=>{
                    let option = {label : value , value: value};
                    options.push(option);
                });
                return options;
            }
        }

    }
}());